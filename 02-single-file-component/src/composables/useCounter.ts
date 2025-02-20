import { computed, ref } from 'vue';

export const useCounter = (initialValue: number) => {
  const count = ref(initialValue);
  const square = computed(() => count.value * count.value);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  return {
    count,
    square,
    increment,
    decrement,
  };
};
