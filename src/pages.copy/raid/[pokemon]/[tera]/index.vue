<script setup lang="ts">
const props = defineProps<{ pokemon: string; tera: string }>()
const router = useRouter()
const raidStore = useRaidStore()

watchEffect(() => {
  raidStore.setNewRaid(props)
})
const raids: any = inject('raids')

const raid = computed(() => {
  const raid = raids.find((raid: any) => {
    return raid.name === props.pokemon
  })

  if (!raid) {
    router.push('/')
    return
  }

  return raid
})
</script>

<template>
  <div v-if="raid" flex flex-col flex-wrap>
    <TRCRaidDetail :raid="raid" :tera="tera" />
    <TRCDamageRelations :tera="tera" flex-1 />
  </div>
</template>
