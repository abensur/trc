<script lang="ts" setup>
import { SelectList } from '~/types'
const props = defineProps<{ pokemon: string; tera: string }>()
const router = useRouter()
const raids: any = inject('raids')
const currentRaid = ref<any>(raids.find((it: any) => it.name === props.pokemon))
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

watchEffect(() => {
  useHead({
    title: `${capitalize(props.pokemon)} (${capitalize(props.tera)})`,
  })
  useFavicon(
    useRaidStore().getImage(`${props.tera}-tera-min`),
  )
})

const teraValue = computed({
  get() {
    return props.tera
  },
  set(value) {
    if (!value) {
      useFavicon(
        useRaidStore().getImage(`${currentRaid.value.code}`),
      )
      router.push(`/raid/${props.pokemon}`)
    }
  },
})
</script>

<template>
  <div px-2>
    <header flex flex-wrap my-4>
      <TRCBack />
      <TRCSelect v-model="teraValue" ml-2 flex-1 :list="SelectList.TYPES" />
    </header>

    <TRCRaidDetail :pokemon="pokemon" :tera="tera" />
    <TRCDamageRelations :tera="tera" />
  </div>
</template>
