<script setup lang="ts">
import Fuse from 'fuse.js'
import { SelectList } from '~/types'

const props = defineProps<{
  list: SelectList
}>()

const { t } = useI18n()
const types = inject('types')
const pokemons = inject('pokemons')
const stats = inject('stats')
const router = useRouter()
const route = useRoute()

const items = computed(() => {
  switch (props.list) {
    case SelectList.TYPES:
      return types
    case SelectList.POKEMONS:
      return pokemons
    case SelectList.STATS:
      return stats
    default:
      return []
  }
})

const { modelValue } = defineModel<{
  modelValue?: string
}>()

const fuseSearch = (options: any, search: any) => {
  const fuse = new Fuse(options, {
    threshold: 0.42,
  })
  return fuse.search(search).map(result => result.item)
}

const handleSelect = (value: string) => {
  let path = ''
  const encodeAndLower = (str: string) => encodeURIComponent(str.toLocaleLowerCase())
  const pathTo = encodeAndLower(value)
  const [,,pokemon] = route.path.split('/')

  switch (props.list) {
    case SelectList.POKEMONS:
      path = `/raid/${pathTo}`
      break
    case SelectList.TYPES:
      path = `/raid/${pokemon}/${pathTo}`
      break
    case SelectList.STATS:
      path = `/loot/${pathTo}`
      break
    default:
      break
  }

  router.push(path)
}
</script>

<template>
  <v-select
    v-model="modelValue"
    capitalize
    :filter="fuseSearch"
    :options="items"
    :placeholder="t(`select.${list}`)"
    @option:selected="handleSelect"
  />
</template>
