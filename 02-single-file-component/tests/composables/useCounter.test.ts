import { useCounter } from '@/composables/useCounter.ts';

describe('useCounter', () => {
  const initialValue = 2;

  test('should return count and square', () => {
    const { count, square } = useCounter(initialValue);

    expect(count.value).toBe(initialValue);
    expect(square.value).toBe(Math.pow(initialValue, 2));
  });

  test('should increment count', () => {
    const { count, increment } = useCounter(initialValue);

    increment();
    expect(count.value).toBe(initialValue + 1);
  });

  test('should decrement count', () => {
    const { count, decrement } = useCounter(initialValue);

    decrement();
    expect(count.value).toBe(initialValue - 1);
  });
});
