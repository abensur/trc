<script lang="ts" setup>
import { SelectList } from '~/types'
const props = defineProps<{ pokemon: string; tera: string }>()
const router = useRouter()

const teraValue = computed({
  get() {
    return props.tera
  },
  set(value) {
    if (!value)
      router.push(`/raid/${props.pokemon}`)
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
