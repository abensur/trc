<script setup lang="ts">
const modules = import.meta.glob('~/assets/images/**/*.png')
const loaded = ref(false)
const raid = useRaidStore()

const count = ref(Object.keys(modules).length)
for (const path in modules) {
  modules[path]().then(() => {
    const p = new URL(path, import.meta.url)
    const code = p.pathname.split('/').pop()?.split('.')[0]
    raid.loadImage({
      code,
      url: p.href,
    })
    count.value--
    loaded.value = count.value === 0
  })
}

useHead({
  title: 'Tera Raid Companion',
  meta: [
    { name: 'description', content: 'Find the best matchup for your tera raids' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView v-if="loaded" />
</template>
