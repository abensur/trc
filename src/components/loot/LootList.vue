<script lang="ts" setup>
const props = defineProps<{
  loot: any
  type?: string
}>()
const raids: any = inject('raids')
const drops: any = inject('drops')
const router = useRouter()
const raidStore = useRaidStore()

const gallery = ref<any[]>([])
const currentDrops = props.loot

currentDrops.forEach(async (value: string) => {
  let image: any = ''

  if (props.type === 'drops') {
    const dropImage = drops.images[value]
    image = dropImage
  }

  else if (props.type === 'pokemon') {
    const code = raids.find((it: any) => it.name === value).code
    image = raidStore.getImage(`${code}`)
  }

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
