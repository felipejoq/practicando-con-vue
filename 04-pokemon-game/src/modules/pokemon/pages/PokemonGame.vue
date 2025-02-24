<script setup lang="ts">
import PokemonImage from '@/modules/pokemon/components/PokemonImage.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame.ts';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokedexCover from '@/modules/pokemon/components/PokedexCover.vue';

const { gameStatus, isLoading, randomPokemon, pokemonsOptions, checkAnswer, getNextRound } =
  usePokemonGame();
</script>

<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center h-screen w-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center h-screen w-screen sm:gap-4">
    <PokedexCover />
    <h1 class="text-3xl sm:text-4xl font-[Pixeboy] text-white">
      Who's that Pokemon? <span class="text-gray-400 text-lg">#{{ randomPokemon.id }}</span>
    </h1>
    <!-- Pokemon Image -->
    <PokemonImage
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.PLAYING"
    />
    <div class="h-5">
      <button
        v-if="gameStatus !== GameStatus.PLAYING"
        class="font-[Pixeboy] text-sm sm:text-xl fade-in transition-all bg-black hover:bg-gray-800 text-white cursor-pointer py-1 px-2 rounded shadow-lg"
        @click="getNextRound()"
      >
        New Game
      </button>
    </div>
    <!-- Pokemon Options -->
    <PokemonOptions
      :correct-pokemon-id="randomPokemon.id"
      :block-selection="gameStatus !== GameStatus.PLAYING"
      :pokemons-options="pokemonsOptions"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<style scoped></style>
