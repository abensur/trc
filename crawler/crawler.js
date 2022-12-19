const cheerio = require('cheerio')
const axios = require('axios')
const data = require('../src/data.json')

const writeResult = (data) => {
  const fsPromises = require('fs').promises
  fsPromises.writeFile('result.json', JSON.stringify(data))
    .then(() => { console.log('JSON saved') })
    .catch((er) => { console.log(er) })
}

const parseResponses = (responses) => {
  const result = []

  responses.forEach((it, index) => {
    const url = it.config.url
    const pkmn = data.find(it => it.url === url)
    const stats = {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      spDefense: 0,
      spAttack: 0,
    }
    if (it.data) {
      const $ = cheerio.load(it.data)
      const statsTable = $('.radar-graph > div.label')
      const statsList = Object.keys(stats)
      let pointer = 0
      statsTable.each(function () {
        const title = $(this).text()
        stats[statsList[pointer++]] = +title.replace(/\D/g, '')
      })
    }
    result.push({
      ...pkmn,
      stats,
    })

    if (index === responses.length - 1)
      writeResult(result)
  })
}

axios.all(data.map(async (it) => {
  return axios.get(it.url)
})).then(axios.spread((...responses) => {
  parseResponses(responses)
})).catch((error) => {
  console.log(error)
})
