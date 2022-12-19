<script lang="ts" setup>
const props = defineProps({
  raid: {
    type: Object,
    required: true,
  },
  tera: {
    type: String,
    required: false,
  },
})
const noha: any = inject('noha')

const abilities = () => {
  const hasHa = !noha.includes(props.raid.name)
  const names = Object.values(props.raid.abilities)
  const temp = names.map((it, index) => {
    return {
      name: it,
      hidden: hasHa && index === names.length - 1,
    }
  })

  return temp
}
</script>

<template>
  <div>
    <h2>Abilities</h2>
    <section grid grid-cols-2 gap-1>
      <div
        v-for="({ name, hidden }, index) in abilities()"
        :key="`ability-${index}`"
        text-center
        class="ability"
        h-30px
        border
        b-rd-4px
        flex
        items-center
        text-12px
        justify-center
        font-mono
      >
        <img relative top--1px inline w-15px mr-2 :src="useRaidStore().getImage(hidden ? 'ability-patch' : 'ability-capsule')">
        {{ name }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.ability:nth-child(3) {
  position: relative;
  transform: translateX(50%);
}
</style>
