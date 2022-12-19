<script lang="ts" setup>
const gallery: any = ref([])
const stats = inject('stats')

const categoriesMap: any = {
  atk: 'muscle-feather',
  spe: 'swift-feather',
  def: 'resist-feather',
  spa: 'genius-feather',
  spd: 'clever-feather',
  hp: 'health-feather',
}

for (const stat of (stats as any)) {
  const name = categoriesMap[stat]
  const href = useRaidStore().getImage(name)
  const image = { href, name, stat }
  gallery.value.push(image)
}
</script>

<template>
  <ul px-2>
    <li v-for="({ href, stat, name }, index) in gallery" :key="index" my-8 flex flex-wrap items-center justify-between>
      <img max-h-40px :src="href" :alt="`${name}`">
      <h2 uppercase font-bold mr-auto ml-2>
        {{ stat }}
      </h2>
      <RouterLink btn :to="`/loot/${stat}`">
        See more
      </RouterLink>
    </li>
  </ul>
</template>
