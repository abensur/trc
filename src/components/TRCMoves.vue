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

const raidStore = useRaidStore()

const moves = () => {
  const temp = props.raid.moves.concat(props.raid.additional_moves || [])
  while (temp.length < 8)
    temp.push({})

  return temp
}
</script>

<template>
  <div>
    <h2>Moves</h2>
    <section grid grid-cols-4 gap-1>
      <div
        v-for="(move, index) in moves()"
        :key="`move-${index}`"
        text-left
      >
        <template v-if="move.name">
          <div class="move">
            <img
              w-20px

              :src="raidStore.getImage(`move-${move.category}`)"
              :alt="move.category"
            >
            <a color-white inline-block text-10px lh-14px capitalize font-mono font-bold :href="move.url" target="_blank">
              {{ move.name }}
            </a>
          </div>
          <img
            w-full
            :src="raidStore.getImage(`${move.type}-min`)"
            :alt="move.type"
          >
        </template>
        <template v-else>
          <div mt-2 dark:color-dark-500 i-carbon-undefined text-32px m-auto opacity-50 />
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.move {
  position: relative;
  height: 32px;
  padding-left: 36px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: #ee1515;
  border-radius: 4px;
  border: 1px solid #ee1515;
  overflow: hidden;
}

html.dark .move {
  border: none;
}

.move a {
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
}

.move::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 32px;
  height: 33px;
  background: #fff;
  border-radius: 4px;
  clip-path: polygon(0 0, 100% 0, 50% 100%, 0% 100%);
}
.move img:first-child {
  position: absolute;
  top: 0;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.75;
}
</style>
