import { acceptHMRUpdate, defineStore } from 'pinia'

export const useRaidStore = defineStore('raid', () => {
  const images = ref([] as any)

  function loadImage(image: any) {
    images.value.push(image)
  }

  function getImage(code: string | number) {
    return images.value.find((image: any) => image.code === code.toString()).url
  }

  return {
    loadImage,
    getImage,
    images,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRaidStore, import.meta.hot))
