import { add, addArray } from '@/helpers/sum.ts';
import { describe, test, expect } from 'vitest';

describe('add', () => {
  test('add 1 + 2 to equal 3', () => {
    // AAA = Arrange, Act, Assert
    const num1 = 1;
    const num2 = 2;
    const result = add(num1, num2);
    expect(result).toBe(num1 + num2);
  });
});

describe('addArray', () => {
  test('addArray [1, 2, 3] to equal 6', () => {
    const numbers = [1, 2, 3];
    const result = addArray(numbers);
    expect(result).toBe(6);
  });

  test('addArray [] to equal 0', () => {
    const numbers = [] as number[];
    const result = addArray(numbers);
    expect(result).toBe(0);
  });
});
