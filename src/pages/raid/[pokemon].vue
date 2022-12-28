<script lang="ts" setup>
import { SelectList } from '~/types'
const props = defineProps<{ pokemon: string; tera?: string }>()
const raids: any = inject('raids')
const currentRaid = ref<any>(raids.find((it: any) => it.name === props.pokemon))
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
watchEffect(() => {
  useHead({
    title: capitalize(props.pokemon),
  })
  useFavicon(
    useRaidStore().getImage(`${currentRaid.value.code}`),
  )
})
</script>

<template>
  <RouterView v-if="tera" />
  <div v-else px-2>
    <header flex flex-wrap my-4>
      <TRCBack />
      <TRCSelect ml-2 flex-1 :list="SelectList.TYPES" />
    </header>
    <TRCRaidDetail :pokemon="pokemon" />
  </div>
</template>
