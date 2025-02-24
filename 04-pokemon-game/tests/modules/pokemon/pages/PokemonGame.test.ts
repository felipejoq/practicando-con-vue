import { mount } from '@vue/test-utils';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { describe, it, expect, type Mock } from 'vitest';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonArray } from '../../../utils/mocks/pokemon.response.ts';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

describe('PokemonGame', () => {
  it('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.PLAYING,
      pokemonsOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toContain('text-3xl');

    expect(wrapper.get('h3').text()).toBe('Cargando Pokemons...');
    expect(wrapper.get('h3').classes()).toContain('animate-pulse');
  });

  it('should render PokemonImage and PokemonOptions', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonArray[0],
      isLoading: false,
      gameStatus: GameStatus.PLAYING,
      pokemonsOptions: pokemonArray.slice(0, 4),
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    const pokemonImage = wrapper.getComponent({ name: 'PokemonImage' });
    const pokemonsOptions = wrapper.getComponent(PokemonOptions);

    expect(wrapper.get('h1').text()).toContain("Who's that Pokemon?");
    expect(pokemonImage).toBeDefined();
    expect(pokemonsOptions).toBeDefined();
  });
});
