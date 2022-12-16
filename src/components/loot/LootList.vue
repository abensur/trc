<script lang="ts" setup>
const props = defineProps<{
  loot: any
  type?: string
}>()
const raids: any = inject('raids')
const drops: any = inject('drops')
const router = useRouter()

const gallery = ref<any[]>([])
const currentDrops = props.loot

currentDrops.forEach((value: string) => {
  let image = ''

  if (props.type === 'drops')
    image = drops.images[value]
  else if (props.type === 'pokemon')
    image = raids.find((it: any) => it.name === value).image

  gallery.value.push({
    src: image,
    alt: value,
  })
})

const handleNavigation = (pokemon: string) => {
  if (props.type === 'drops')
    return

  router.push(`/raid/${pokemon}`)
}
</script>

<template>
  <div grid grid-cols-4 gap-2>
    <div
      v-for="(image, index) in gallery"
      :key="index"
      overflow-hidden
      whitespace-nowrap
      text-ellipsis
      shadow shadow-inset
      px-2
      pt-2
      :class="{ 'cursor-pointer': type === 'pokemon' }"
      @click="handleNavigation(image.alt)"
    >
      <img style="width: 45px; margin: auto" :src="image.src" :alt="image.alt">
      <span text-9px uppercase font-bold :class="{ 'color-purple': type === 'pokemon' }">{{ image.alt }}</span>
    </div>
  </div>
</template>
