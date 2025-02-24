import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame.ts';
import { withSetup } from '../../../utils/with-setup.ts';
import { GameStatus, type Pokemon } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonResponse } from '../../../utils/mocks/pokemon.response.ts';
import confetti from 'canvas-confetti';
import { vi, describe, it, expect, beforeEach, afterAll } from 'vitest';

const mockPokemonApi = new MockAdapter(pokemonApi as any);

mockPokemonApi.onGet('?limit=151').reply(200, {
  results: pokemonResponse,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  beforeEach(() => {});

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should initialize with the correct default values', async () => {
    const [result, app] = withSetup(usePokemonGame);

    expect(result.gameStatus.value).toBe(GameStatus.PLAYING);
    expect(result.isLoading.value).toBe(true);
    expect(result.pokemonsOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBeUndefined();

    await flushPromises();

    expect(result.pokemonsOptions.value).toHaveLength(4);
    expect(result.isLoading.value).toBe(false);
    expect(result.randomPokemon.value).toBeDefined();
  });

  it('should correctly handle getNexRound', async () => {
    const [result, app] = withSetup(usePokemonGame);
    await flushPromises();

    result.gameStatus.value = GameStatus.WON;

    result.getNextRound(2);

    expect(result.gameStatus.value).toBe(GameStatus.PLAYING);
    expect(result.randomPokemon.value).toBeDefined();
    expect(result.pokemonsOptions.value).toHaveLength(2);
  });

  it('should correctly handle getNexRound and return different pokemons', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    const oldOptions = result.pokemonsOptions.value.map((p: Pokemon) => p.name);

    result.getNextRound();

    const newOptions = result.pokemonsOptions.value.map((p: Pokemon) => p.name);

    expect(newOptions).not.toEqual(oldOptions);
  });

  it('should correctly handle an incorrect answer', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = result;

    expect(gameStatus.value).toBe(GameStatus.PLAYING);

    checkAnswer(1000000);

    expect(confetti).not.toHaveBeenCalled();
    expect(gameStatus.value).toBe(GameStatus.LOST);

    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalled();

    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });

    expect(gameStatus.value).toBe(GameStatus.WON);
  });
});
