<script setup lang="ts">
const pokemon = $ref('')
const tera = $ref('')
const stat = $ref('')

const router = useRouter()
const go = () => {
  if (!pokemon || !tera)
    return
  router.push(`/raid/${encodeURIComponent(pokemon.toLocaleLowerCase())}/${encodeURIComponent(tera.toLocaleLowerCase())}`)
}

const { t } = useI18n()
</script>

<template>
  <div px-4 pt-4>
    <TRCSelect v-model="pokemon" list="pokemon" />

    <TRCSelect v-model="tera" my-4 list="type" />

    <TRCSelect v-model="stat" my-4 list="stats" />

    <TRCPokemon :pokemon="pokemon" :type="tera" />

    <div>
      <button
        btn mt-3 text-sm w-full
        :disabled="!tera || !pokemon"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>
