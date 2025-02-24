import { pokemonApi } from '@/modules/pokemon/api/pokemonApi.ts';
import { describe, it, expect } from 'vitest';

describe('pokemonApi', () => {
  it('should be configured as expected', () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    expect(BASE_URL).toBe(pokemonApi.defaults.baseURL);
  });
});
