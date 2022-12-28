<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: '404',
})
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
