<script lang="ts" setup>
const props = defineProps<{ category: string }>()

const drops = inject('drops')

const loot = computed(() => {
  return (drops as any)[props.category]
})
</script>

<template>
  <div px-2 pb-4>
    <header flex flex-wrap py-3 border-b items-center>
      <TRCBack />
      <h1 ml-2 flex-1 uppercase font-bold text-2xl>
        raid type: <mark px-2>{{ category }}</mark>
      </h1>
    </header>
    <br>
    <h2 text-left font-bold mb-2>
      If you are looking for these:
    </h2>
    <LootList type="drops" :loot="loot.drops" />
    <br>
    <h2 text-left font-bold mb-2>
      Farm these:
    </h2>
    <LootList type="pokemon" :loot="loot.pokemon" />
  </div>
</template>

<style lang="less">

</style>
