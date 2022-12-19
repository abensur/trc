<script lang="ts" setup>
import { SelectList } from '~/types'
defineProps<{ pokemon: string; tera?: string }>()
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
