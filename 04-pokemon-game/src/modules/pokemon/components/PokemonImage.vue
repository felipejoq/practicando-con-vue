<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImage = computed(() => {
  return `${import.meta.env.VITE_POKEMON_IMAGE_URL}${props.pokemonId}.png`;
});
</script>

<template>
  <section>
    <img
      v-if="!showPokemon"
      :src="pokemonImage"
      alt="Pokemon Image 1"
      class="brightness-0 max-w-[200px] max-h-[200px] sm:max-w-[250px] sm:max-h-[250px]"
    />
    <img
      v-else
      :src="pokemonImage"
      class="fade-in max-w-[200px] max-h-[200px] sm:max-w-[250px] sm:max-h-[250px]"
      alt="Pokemon Image 2"
    />
  </section>
</template>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
</style>
