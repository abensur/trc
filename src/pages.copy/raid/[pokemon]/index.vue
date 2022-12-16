<script setup lang="ts">
const props = defineProps<{ pokemon: string }>()
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
  <div v-if="raid">
    <TRCRaidDetail :raid="raid" />
  </div>
</template>
