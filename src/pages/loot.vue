<script lang="ts" setup>
import { SelectList } from '~/types'
defineProps<{ category?: string }>()
useHead({
  title: 'Loots',
})
</script>

<template>
  <RouterView v-if="category" />
  <div v-else>
    <header flex flex-wrap px-2 my-4>
      <TRCBack />
      <TRCSelect ml-2 flex-1 :list="SelectList.STATS" />
    </header>
    <LootCategories />
  </div>
</template>
