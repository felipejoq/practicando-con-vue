<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemon/interfaces';

interface Props {
  pokemonsOptions: Pokemon[];
  blockSelection: boolean;
  correctPokemonId: number;
}

const { pokemonsOptions, blockSelection, correctPokemonId } = defineProps<Props>();

const emit = defineEmits<{
  selectedOption: [id: number];
}>();

const onSelectedOption = (id: number) => {
  emit('selectedOption', id);
};
</script>

<template>
  <section
    class="font-[Pixeboy] text-xl sm:text-2xl flex flex-col justify-center items-center mt-5"
  >
    <ul
      class="flex flex-row flex-wrap justify-center xs:flex-col gap-4 items-center tracking-widest"
    >
      <li v-for="{ id, name } in pokemonsOptions" :key="id">
        <button
          :disabled="blockSelection"
          @click="onSelectedOption(id)"
          :class="[
            'capitalize text-gray-500 text-xl cursor-pointer py-2 px-4 rounded shadow-lg bg-gray-100 hover:shadow disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none',
            {
              correct: id === correctPokemonId && blockSelection,
              incorrect: id !== correctPokemonId && blockSelection,
            },
          ]"
        >
          {{ name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.correct {
  color: #ffffff;
  background-color: rgba(172, 255, 172, 0.5);
}

.incorrect {
  color: #ffffff;
  background-color: rgba(50, 50, 50, 0.5);
}
</style>
