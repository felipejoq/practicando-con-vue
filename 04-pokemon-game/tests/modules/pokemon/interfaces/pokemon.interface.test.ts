import type { Pokemon } from '@/modules/pokemon/interfaces';
import { describe, it, expect } from 'vitest';

describe('Pokemon Interface', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
  };

  it('should have an id property of type number', () => {
    expect(typeof pokemon.id).toBe('number');
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  it('should have a name property of type string', () => {
    expect(typeof pokemon.name).toBe('string');
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
