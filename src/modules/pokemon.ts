import { type UserModule } from '~/types'
import RAIDS from '~/data.json'
import DROPS from '~/drops.json'

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
]

const CATEGORIES = [
  'physical',
  'special',
  'status',
]

const STATS = [
  'atk',
  'def',
  'spa',
  'spd',
  'spe',
  'hp',
]

const NO_HA = [
  'toedscruel',
  'mimikyu',
  'clawitzer',
  'hydreigon',
  'gengar',
  'lycanroc',
]

const POKEMONS = RAIDS.map(raid => raid.name)

const inferDamageType = (raid: any) => {
  const count = (raid.moves.concat(raid.additional_moves || [])).reduce((acc: any, move: any) => {
    if (move.category !== 'status')
      acc[move.category] += 1
    return acc
  }, { physical: 0, special: 0 })

  const maxType = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)

  return maxType
}

const getTauntSuggestion = (raid: any, countOnly = false) => {
  const count = (raid.moves.concat(raid.additional_moves || [])).reduce((acc: any, move: any) => {
    acc[move.category] += 1
    return acc
  }, { physical: 0, status: 0, special: 0 })

  if (countOnly)
    return `${count.status}`

  let suggestion = ''
  switch (count.status) {
    case 0:
      suggestion = 'no'
      break
    case 1:
      suggestion = 'low'
      break
    case 2:
      suggestion = 'medium'
      break
    case 3:
      suggestion = 'high'
      break
    default:
      suggestion = 'very high'
      break
  }

  return suggestion
}

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = ({ app }) => {
  app.provide('types', TYPES)
  app.provide('categories', CATEGORIES)
  app.provide('raids', RAIDS)
  app.provide('pokemons', POKEMONS)
  app.provide('drops', DROPS)
  app.provide('noha', NO_HA)
  app.provide('stats', STATS)
  app.provide('pokeapi', 'https://pokeapi.co/api/v2')
  app.provide('inferDamageType', inferDamageType)
  app.provide('getTauntSuggestion', getTauntSuggestion)
}
