<script lang="ts" setup>
const props = defineProps<{ tera: string }>()
const router = useRouter()
const pokeapi = inject('pokeapi')
const types = inject('types')
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

const getOpacityFromType = (type: string) => {
  const value = getDamageFromType(type)
  switch (value) {
    case 2:
      return 100
    case 0.5:
      return 25
    case 0:
      return 10
    default:
      return 50
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
</script>

<template>
  <div v-if="loading" text-center mt-4>
    <div i-carbon-hurricane class="animate-spin ma-auto" />
    {{ t('loading.dmg_rel') }}
  </div>
  <div v-else text-3 grid grid-cols-9 mx-2 border>
    <div
      v-for="item in types"
      :key="item"
      :class="`opacity-${getOpacityFromType(item)} ${item}`"
      h-full
      flex
      flex-wrap
    >
      <div
        rotate-180 text-left flex-1 font-mono text-10px uppercase relative overflow-hidden
      >
        <span class="lh-10px absolute  transform-origin-bottom-left rotate-90 top--8px">{{ item }}</span>
        <mark px-1 font-bold color-white bg-black bg-opacity-50 absolute class="rotate-180 top-50% left-50% transform -translate-x-1/2 -translate-y-1/2">{{ getDamageFromType(item) }}</mark>
      </div>
    </div>
  </div>
</template>
