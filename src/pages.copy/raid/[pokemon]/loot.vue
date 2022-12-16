<script setup lang="ts">
const props = defineProps<{ pokemon: string }>()
const router = useRouter()
// const raidStore = useRaidStore()

// const raids: any = inject('raids')
const { t } = useI18n()
const drops: any = inject('drops')
const dropsMap = Object.keys(drops).reduce((acc: any, key: any) => {
  drops[key].type = key
  acc.push(drops[key])
  return acc
}, [])

// const raid = computed(() => {
//   const cRaid = raids.find((r: any) => {
//     return r.name === props.pokemon
//   })

//   if (!cRaid) {
//     router.push('/')
//     return
//   }

//   return cRaid
// })

const drop = computed(() => {
  const cDrop = dropsMap.find((dropType: any) => {
    return dropType.pokemon?.indexOf(props.pokemon) > -1
  })

  if (!cDrop) {
    router.push(`/${props.pokemon}`)
    return
  }

  return cDrop
})

const handleBack = () => {
  router.push(`/raid/${props.pokemon}`)
}
</script>

<template>
  <div>
    <button
      btn mt-3 text-sm w-full
      @click="handleBack"
    >
      {{ t('button.back') }}
    </button>
    <div v-for="(d, index) in drop.drops" :key="index">
      {{ d }}
    </div>
  </div>
</template>
