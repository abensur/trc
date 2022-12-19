<script lang="ts" setup>
const props = defineProps<{ pokemon: string; tera?: string }>()
const raids: any = inject('raids')
const drops: any = inject('drops')
const raidStore = useRaidStore()
const getTauntSuggestion: any = inject('getTauntSuggestion')
const inferDamageType: any = inject('inferDamageType')
const currentRaid = ref<any>(raids.find((it: any) => it.name === props.pokemon))
const currentDrops = Object.keys(drops)
  .map((it) => {
    const item = drops[it]
    item.category = it
    return item
  }).find(it => it.pokemon.includes(props.pokemon))

const categoriesMap: any = {
  atk: raidStore.getImage('muscle-feather'),
  spe: raidStore.getImage('swift-feather'),
  def: raidStore.getImage('resist-feather'),
  spa: raidStore.getImage('genius-feather'),
  spd: raidStore.getImage('clever-feather'),
  hp: raidStore.getImage('health-feather'),
}
const categoryHref = categoriesMap[currentDrops.category]

const getDefenseStats = (raid: any) => {
  const { defense, spDefense } = raid.stats

  return `${defense} / ${spDefense}`
}
const getAbilityOpacity = (ability: string) => {
  switch (ability) {
    case 'Hidden Ability':
      return ['', 'opacity-40 grayscale']
    case 'Hidden Possible':
    case 'Random':
      return ['', '']
    case 'Standard':
      return ['opacity-40 greyscale', '']
    default:
      return ['', '']
  }
}
</script>

<template>
  <div>
    <header flex flex-wrap items-start pb-2>
      <div relative>
        <img
          v-if="tera"
          w-10 h-10
          absolute
          :src="raidStore.getImage(`${tera}-tera-min`)"
        >
        <a capitalize color-blue :href="currentRaid.url" target="_blank">
          <img min-h-129px class="top-2.5" w-130px :src="raidStore.getImage(currentRaid.code)" :alt="pokemon">
          <div pt-2 flex items-center justify-center>
            {{ pokemon }}<div ml-1 text-13px i-carbon-launch />
          </div>
        </a>
      </div>
      <div relative flex-1 px-4>
        <div absolute top-0 right-0>
          <img
            :class="{
              'opacity-40 grayscale': currentRaid.game === 'Violet',
            }" w-10 h-10 :src="raidStore.getImage('book-scarlet')"
          >
          <img
            :class="{
              'opacity-40 grayscale': currentRaid.game === 'Scarlet',
            }" w-10 h-10 :src="raidStore.getImage('book-violet')"
          >
        </div>
        <dl flex flex-wrap items-center>
          <dd>
            <RouterLink w-80px :to="`/loot/${currentDrops.category}`" flex items-center btn bg-transparent color-dark hover:color-light dark:color-light border-purple border-1 px-2 w-fit>
              <img w-25px :src="categoryHref" alt="">
              <span ml-2 uppercase font-mono>
                <div v-if="currentDrops.category === 'hp'" w-28px />
                {{ currentDrops.category }}
              </span>
            </RouterLink>
          </dd>
          <dt class="w-1/2" font-bold text-10px text-left indent-2 font-mono>
            - Loot type
          </dt>
          <dd>
            <div w-78px h-33px flex items-center justify-center mx-1px color-dark dark:color-light>
              <img w-25px :src="raidStore.getImage('move-status')" alt="">
              <span ml-2 uppercase font-mono>
                &nbsp;&nbsp;{{ getTauntSuggestion(currentRaid, true) }}
              </span>
            </div>
          </dd>
          <dt class="w-1/2" font-bold text-10px text-left indent-2 font-mono>
            - # Status
          </dt>

          <dd>
            <div w-78px h-33px flex items-center justify-center mx-1px color-dark dark:color-light>
              <img w-25px relative left--1px :src="raidStore.getImage('move-physical')" alt="">
              <span font-mono uppercase class="mx-1px">
                {{ inferDamageType(currentRaid) === 'physical' ? '>' : '<' }}
              </span>
              <img w-25px relative right--1px :src="raidStore.getImage('move-special')" alt="">
            </div>
          </dd>
          <dt class="w-1/2" font-bold text-10px text-left indent-2 font-mono>
            - Dmg type
          </dt>

          <dd>
            <div w-78px h-33px flex items-center justify-center mx-1px color-dark dark:color-light>
              <span font-mono text-12px uppercase class="mx-1px">
                {{ getDefenseStats(currentRaid) }}
              </span>
            </div>
          </dd>
          <dt class="w-1/2" font-bold text-10px text-left indent-2 font-mono>
            - DEF / SPD
          </dt>

          <dd>
            <div w-78px h-33px flex items-center justify-center mx-1px color-dark dark:color-light>
              <img :class="getAbilityOpacity(currentRaid.ability)[0]" w-25px relative left--1px :src="raidStore.getImage('ability-patch')" alt="">
              <span font-mono uppercase class="mx-1px">
                  &nbsp;
              </span>
              <img :class="getAbilityOpacity(currentRaid.ability)[1]" w-25px relative right--1px :src="raidStore.getImage('ability-capsule')" alt="">
            </div>
          </dd>
          <dt class="w-1/2" font-bold text-10px text-left indent-2 font-mono>
            - ability
          </dt>
        </dl>
      </div>
    </header>
    <TRCAbilities :raid="currentRaid" mb-2 />
    <TRCMoves :raid="currentRaid" />
  </div>
</template>

<style scoped>

</style>
