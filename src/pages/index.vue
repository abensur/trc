<template>
  <div px-2 pt-2 grid grid-cols-1 gap-2 items-start>
    <div shadow pb-2 dark:shadow-white ma-auto>
      <img :src="useRaidStore().getImage('raid')" alt="raid">
      <RouterLink btn to="/raid">
        Raids
      </RouterLink>
    </div>
    <div shadow pb-2 dark:shadow-white ma-auto mt-4>
      <img :src="useRaidStore().getImage('loot')" alt="loot">
      <RouterLink btn to="/loot">
        Loots
      </RouterLink>
    </div>
  </div>
</template>
