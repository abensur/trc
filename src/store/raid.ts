import { acceptHMRUpdate, defineStore } from 'pinia'

interface Raid {
  pokemon: string
  tera: string
}

export const useRaidStore = defineStore('raid', () => {
  const raid = ref<Raid | null>(null)

  function setNewRaid(newRaid: Raid) {
    raid.value = { ...newRaid }
  }

  return {
    setNewRaid,
    raid,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRaidStore, import.meta.hot))
