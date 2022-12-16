<script lang="ts" setup>
const raids: any = inject('raids')
const router = useRouter()

const go = (pokemon: string) => {
  router.push(`/raid/${pokemon}`)
}
</script>

<template>
  <div px-4 pt-4 pb-10 w-full>
    <div grid grid-cols-4 w-full gap-2>
      <div v-for="(raid, index) in raids" :key="index" border text-center pt-2 cursor-pointer transition shadow-md hover:shadow-sm @click="go(raid.name)">
        <img m-auto w-50px h-50px :src="raid.image" :alt="raid.name">
        <span text-12px>{{ raid.name }}</span>
      </div>
    </div>
  </div>
</template>
