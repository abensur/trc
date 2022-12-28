<script lang="ts" setup>
import { SelectList } from '~/types'
defineProps<{ pokemon?: string }>()
useHead({
  title: 'Raids',
})
const router = useRouter()
const raids: any = inject('raids')
const drops: any = inject('drops')
const inferDamageType: any = inject('inferDamageType')
const getTauntSuggestion: any = inject('getTauntSuggestion')
const stats = inject('stats')
const raidStore = useRaidStore()
const go = (pokemon: string) => {
  router.push(`/raid/${pokemon}`)
}

const selectedLoot = ref<string>('')
const selectedCommonDmgType = ref<string>('')
const selectedTauntThreat = ref<string>('')

const computedRaids = computed(() => {
  let arr = [...raids].map((it) => {
    const dmgType = inferDamageType(it)
    const taunt = getTauntSuggestion(it)
    it.commonDmgType = dmgType
    it.taunt = taunt
    return it
  })

  if (selectedLoot.value) {
    const filter = drops[selectedLoot.value].pokemon
    arr = arr.filter(it => filter.includes(it.name))
  }

  if (selectedCommonDmgType.value)
    arr = arr.filter(it => it.commonDmgType === selectedCommonDmgType.value)

  if (selectedTauntThreat.value)
    arr = arr.filter(it => it.taunt === selectedTauntThreat.value)

  return arr
})
</script>

<template>
  <RouterView v-if="pokemon" />
  <div v-else px-2>
    <header flex flex-wrap my-4>
      <TRCBack />
      <TRCSelect ml-2 flex-1 :list="SelectList.POKEMONS" />
    </header>
    <section flex flex-wrap gap-2 mb-4>
      <v-select
        v-model="selectedLoot"
        flex-1
        capitalize
        :options="stats"
        placeholder="Loot?"
      />
      <v-select
        v-model="selectedCommonDmgType"
        flex-1
        capitalize
        :options="['physical', 'special']"
        placeholder="Dmg?"
      />
      <v-select
        v-model="selectedTauntThreat"
        flex-1
        capitalize
        :options="['no', 'low', 'medium', 'high', 'very high']"
        placeholder="Taunt?"
      />
    </section>
    <div pb-10 w-full>
      <div grid grid-cols-4 w-full gap-2>
        <div v-for="(raid, index) in computedRaids" :key="index" border text-center pt-2 cursor-pointer transition shadow-md hover:shadow-sm @click="go(raid.name)">
          <img m-auto w-50px h-50px :src="raidStore.getImage(raid.code)" :alt="raid.name">
          <span text-12px>{{ raid.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>
section {
  --vs-font-size: 10px;
}
section :deep(.vs__selected) {
  font-size: 10px;
}
section :deep(.vs__selected-options) {
  height: 20px;
}
</style>
