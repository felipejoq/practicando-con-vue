<script setup lang="ts">
import PokedexImg from '@/assets/images/pokedex.webp';
</script>

<template>
  <img
    :src="PokedexImg"
    alt="Pokedex Cover"
    class="w-full h-full z-[-1] absolute inset-0 object-contain min-w-50"
  />
</template>

<style scoped></style>
