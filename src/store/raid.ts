import { acceptHMRUpdate, defineStore } from 'pinia'

export const useRaidStore = defineStore('raid', () => {
  function getImage(code: string | number) {
    return `/images/${code}.png`
  }

  return {
    getImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRaidStore, import.meta.hot))
