<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useCounter } from '@/composables/useCounter.ts';

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { count, square, increment, decrement } = useCounter(props.value);
    return {
      count,
      square,
      increment,
      decrement,
    };
  },
});
</script>

<template>
  <section
    class="flex flex-col items-center gap-4 border border-gray-200 rounded p-4 min-w-[200px]"
  >
    <div class="text-center">
      <h3 class="text-2xl font-bold text-blue-500">Counter: {{ count }}</h3>
      <h3 class="text-2xl font-bold text-green-500">Square: {{ square }}</h3>
    </div>
    <div class="flex gap-3">
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
  </section>
</template>

<style scoped></style>
