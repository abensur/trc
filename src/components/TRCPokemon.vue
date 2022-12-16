<script lang="ts" setup>
const props = defineProps({
  pokemon: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
})

const raids: any = inject('raids')

const raid = computed(() => {
  return raids.find((raid: any) => raid.name === props.pokemon)
})
</script>

<template>
  <div
    :class="type || 'bg-light-200 dark:bg-dark-200'"
    text-center
    shadow-inset
    shadow
    h-auto
    min-h-180px
    py-2
    mx-auto
    flex
    flex-wrap
    transition
  >
    <img v-if="raid" :src="raid.image" :alt="pokemon" h-190px w-auto m-auto>
    <div v-else i-carbon-help m-auto text-8xl />
  </div>
</template>
