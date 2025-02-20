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
