export const add = (a: number, b: number): number => a + b;

export const addArray = (numbers: number[]): number => numbers.reduce(add, 0);
