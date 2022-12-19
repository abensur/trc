<script lang="ts" setup>
const props = defineProps<{ tera: string }>()
const sortingDefault = ref(true)

const router = useRouter()
const pokeapi = inject('pokeapi')
const types: any = inject('types')
const loading = ref<boolean>(true)
const relations = ref<any>(null)
const { t } = useI18n()

const getDamageRelations = async (tera: string) => {
  const res = await fetch(`${pokeapi}/type/${tera}`)
  const data = await res.json()
  return data.damage_relations
}

const getDamageFromType = (type: string) => {
  const relation = relations.value.find((it: any) => it.type === type)
  return relation ? relation.value : 1
}

const getGrayscale = (type: string) => {
  const value = getDamageFromType(type)
  switch (value) {
    case 2:
      return 0
    case 0.5:
    case 0:
      return 1
    default:
      return 0
  }
}

watchEffect(() => {
  loading.value = true
  getDamageRelations(props.tera)
    .then((data) => {
      relations.value = [
        ...data.double_damage_from.map((it: any) => ({ type: it.name, value: 2 })),
        ...data.half_damage_from.map((it: any) => ({ type: it.name, value: 0.5 })),
        ...data.no_damage_from.map((it: any) => ({ type: it.name, value: 0 })),
      ]

      loading.value = false
    })
    .catch(() => {
      router.push('/')
    })
})

const sortedTypes = computed(() => {
  if (sortingDefault.value) {
    return types
  }
  else {
    return [...types].sort((a, b) => {
      const aVal = getDamageFromType(a)
      const bVal = getDamageFromType(b)
      if (aVal > bVal)
        return -1

      else if (aVal < bVal)
        return 1

      else
        return 0
    })
  }
})
</script>

<template>
  <div v-if="loading" text-center pt-28>
    <div i-carbon-hurricane class="animate-spin ma-auto" />
    {{ t('loading.dmg_rel') }}
  </div>
  <div v-else mt-4>
    <div flex items-center justify-center>
      Types eff. vs&nbsp;<span capitalize>{{ props.tera }}</span>
      <span
        v-if="sortingDefault"
        inline-block
        i-carbon-automatic
        class="ml-1"
        @click=" sortingDefault = false"
      />

      <span
        v-else
        inline-block
        i-carbon-inspection
        class="ml-1"
        @click=" sortingDefault = true"
      />
    </div>
    <div text-3 grid grid-cols-4 gap-1>
      <div
        v-for="item in sortedTypes"
        :key="item"
        class="item"
        :style="{ filter: `grayscale(${getGrayscale(item)})` }"
        flex
        flex-wrap
      >
        <div>
          <span font-mono font-bold>
            {{ getDamageFromType(item) }}x
          </span>
          <img :src="useRaidStore().getImage(`${item}-min`)">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item:last-child {
  grid-column-end: -2;
}

.item:nth-last-child(2) {
  grid-column-end: -3;
}
</style>
