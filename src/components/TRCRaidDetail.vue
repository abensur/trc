<script lang="ts" setup>
import movePhy from '~/assets/images/move-physical.png'
import moveSpe from '~/assets/images/move-special.png'
import moveSta from '~/assets/images/move-status.png'
import naranjaAcademy from '~/assets/images/naranja-academy.png'
import uvaAcademy from '~/assets/images/uva-academy.png'
const props = defineProps({
  raid: {
    type: Object,
    required: true,
  },
  tera: {
    type: String,
    required: false,
  },
})
const { t } = useI18n()
// const activeTera = $ref(props.tera)

const getCategory = (category: string) => {
  switch (category) {
    case 'physical':
      return movePhy
    case 'special':
      return moveSpe
    default:
      return moveSta
  }
}

const getTauntSuggestion = (raid: any) => {
  const count = (raid.moves.concat(raid.additional_moves || [])).reduce((acc: any, move: any) => {
    acc[move.category] += 1
    return acc
  }, { physical: 0, status: 0, special: 0 })

  let suggestion = ''
  switch (count.status) {
    case 0:
      suggestion = t('taunt.no')
      break
    case 1:
      suggestion = t('taunt.low')
      break
    case 2:
      suggestion = t('taunt.medium')
      break
    case 3:
      suggestion = t('taunt.high')
      break
    default:
      suggestion = t('taunt.very_high')
      break
  }

  return suggestion
}

const inferDamageType = (raid: any) => {
  const count = (raid.moves.concat(raid.additional_moves || [])).reduce((acc: any, move: any) => {
    if (move.category !== 'status')
      acc[move.category] += 1
    return acc
  }, { physical: 0, special: 0 })

  const maxType = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)

  return maxType
}

const moves = () => {
  const temp = props.raid.moves.concat(props.raid.additional_moves || [])
  while (temp.length < 8)
    temp.push({})

  return temp
}

const getDefenseStats = (raid: any) => {
  const { defense, spDefense } = raid.stats

  return `${defense} / ${spDefense}`
}
</script>

<template>
  <div>
    <aside>
      <div flex flex-wrap px-2 py-3 items-center>
        <a
          capitalize
          text-blue
          text-2xl
          :href="props.raid.url"
          target="_blank"
        >
          {{ props.raid.name }}
        </a>

        <img
          :class="{
            'opacity-40 grayscale': props.raid.game === 'Scarlet',
          }" ml-auto w-10 h-10 :src="uvaAcademy" :alt="t('raid.uva')"
        >
        <img
          :class="{
            'opacity-40 grayscale': props.raid.game === 'Violet',
          }" w-10 h-10 :src="naranjaAcademy" :alt="t('raid.naranja')"
        >
      </div>
      <!-- <TRCSelect v-model="activeTera" navigate mx-2 mb-2 list="type" /> -->
      <TRCPokemon :pokemon="props.raid.name" :type="props.tera" />

      <hr>
      <div class="text-left px-2 pt-2 pb-1 font-mono">
        <dl class="text-3.5" grid grid-cols-2 grid-rows-2 gap-1>
          <div border px-2 py-1>
            <dt>{{ t('raid.taunt') }}:</dt>
            <dd text-right>
              {{ getTauntSuggestion(raid) }}
            </dd>
          </div>
          <div border px-2 py-1>
            <dt>{{ t('raid.ability') }}:</dt>
            <dd text-right>
              {{ props.raid.ability.toLowerCase() }}
            </dd>
          </div>
          <div border px-2 py-1>
            <dt>{{ t('raid.damage') }}:</dt>
            <dd text-right>
              {{ inferDamageType(raid) }}
            </dd>
          </div>
          <div border px-2 py-1>
            <dt>{{ t('raid.defense') }}:</dt>
            <dd text-right>
              {{ getDefenseStats(raid) }}
            </dd>
          </div>
        </dl>
      </div>
    </aside>
    <main>
      <section grid grid-cols-4 gap-1 mx-2 mb-2 border-b pb-2>
        <div
          v-for="(move, index) in moves()"
          :key="`move-${index}`"
          class="bg-light-700"
          :class="move.type"
          relative
          flex
          flex-wrap
        >
          <template v-if="move.name">
            <a relative z-1 m-auto font-bold :href="move.url" target="_blank">
              <mark text-blue dark:text-blue bg-black bg-opacity-50>&nbsp;{{ move.name }}&nbsp;</mark>
            </a>
            <img
              class="drop-shadow absolute left-50% top-50% transform -translate-x-1/2 -translate-y-1/2"
              :src="getCategory(move.category)"
              :alt="move.category"
            >
          </template>
          <template v-else>
            <div dark:color-dark-500 i-carbon-undefined text-32px m-auto opacity-50 />
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
main > section > div {
  height: 90px;
  font-size: 10px;
  text-transform: uppercase;
}
</style>
