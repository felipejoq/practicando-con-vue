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
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonId}.png`;
});
</script>

<template>
  <section>
    <img v-if="!showPokemon" :src="pokemonImage" alt="Pokemon Image" class="brightness-0" />
    <img v-else :src="pokemonImage" class="fade-in" alt="Pokemon Image" />
  </section>
</template>

<style scoped>
img {
  width: 250px;
  height: 250px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
</style>
