<script lang="ts" setup>
import violetBook from '~/assets/images/book-violet.png'
import scarletBook from '~/assets/images/book-scarlet.png'
import { SelectList } from '~/types'
const props = defineProps<{ pokemon: string; tera?: string }>()
const raids: any = inject('raids')
const drops: any = inject('drops')
const getTauntSuggestion: any = inject('getTauntSuggestion')
const inferDamageType: any = inject('inferDamageType')
const currentRaid = raids.find((it: any) => it.name === props.pokemon)
const currentDrops = Object.keys(drops)
  .map((it) => {
    const item = drops[it]
    item.category = it
    return item
  }).find(it => it.pokemon.includes(props.pokemon))

const categoriesMap: any = {
  atk: 'muscle-feather',
  spe: 'swift-feather',
  def: 'resist-feather',
  spa: 'genius-feather',
  spd: 'clever-feather',
  hp: 'health-feather',
}
const name = categoriesMap[currentDrops.category]
const categoryHref = `../src/assets/images/loot/${name}.png`

const getDefenseStats = (raid: any) => {
  const { defense, spDefense } = raid.stats

  return `${defense} / ${spDefense}`
}
const getMoves = (raid: any) => {
  const temp = raid.moves.concat(raid.additional_moves || [])
  while (temp.length < 8)
    temp.push({})

  return temp
}
</script>

<template>
  <RouterView v-if="tera" />
  <div v-else px-2>
    <header flex flex-wrap my-4>
      <TRCBack />
      <TRCSelect ml-2 flex-1 :list="SelectList.TYPES" />
    </header>
    <div>
      <header flex flex-wrap items-start border-b pb-2>
        <img border-r relative class="top-2.5" w-140px :src="currentRaid.image" :alt="pokemon">
        <dl grid grid-cols-2 class="gap-y-3.5" pl-2 pt-4 items-start>
          <dt text-left text-xs border-b mr-auto>
            Serebii:
          </dt>
          <dd>
            <a capitalize color-blue :href="currentRaid.url" target="_blank">{{ pokemon }}</a>
          </dd>
          <dt text-left text-xs border-b mr-auto>
            Game:
          </dt>
          <dd flex>
            <img
              :class="{
                'opacity-40 grayscale': currentRaid.game === 'Violet',
              }" ml-auto w-10 h-10 :src="scarletBook"
            >
            <img
              :class="{
                'opacity-40 grayscale': currentRaid.game === 'Scarlet',
              }" w-10 h-10 :src="violetBook"
            >
          </dd>
          <dt text-left text-xs border-b mr-auto>
            Loot:
          </dt>
          <dd>
            <RouterLink :to="`/loot/${currentDrops.category}`" flex items-center btn px-2>
              <img w-25px :src="categoryHref" alt="">
              <span ml-2 uppercase>
                {{ currentDrops.category }}
              </span>
            </RouterLink>
          </dd>
        </dl>
      </header>
      <ul>
        <li>{{ getTauntSuggestion(currentRaid) }}</li>
        <li>{{ inferDamageType(currentRaid) }}</li>
        <li>{{ currentRaid.ability }}</li>
        <li>{{ getDefenseStats(currentRaid) }}</li>
        <li>{{ getMoves(currentRaid).length }}</li>
        <li>{{ currentDrops.drops }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">

</style>
