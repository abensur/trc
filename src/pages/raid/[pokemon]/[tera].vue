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
    <h1>{{ pokemon }}</h1>
    <h2> {{ tera }}</h2>
    <ul>
      <li>pokemon name (enum)</li>
      <li>game version (enum)</li>
      <li>taunt threat (enum)</li>
      <li>common dmg type (enum)</li>
      <li>ability (enum)</li>
      <li>def / sp. def (number / number)</li>
      <li>moves (array)</li>
      <li>loot (array)</li>
      <li>loot category (enum)</li>
      <li>type damage relations</li>
    </ul>
  </div>
</template>

<style lang="less">

</style>
