<script setup lang="ts">
const { t } = useI18n()
// const { t, availableLocales, locale } = useI18n()

// const toggleLocales = () => {
//   // change to some real logic
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }

// console.log(toggleLocales)
</script>

<template>
  <nav text-xl flex flex-wrap justify-between items-center shadow py-2>
    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <RouterLink to="/" :title="t('button.home')">
      Tera Raid Companion
    </RouterLink>

    <a class="icon-btn mx-2" href="https://github.com/abensur/tera-raid-companion" target="_blank" title="Github">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
