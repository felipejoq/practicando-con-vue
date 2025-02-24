import { GameStatus, type Pokemon, type PokemonsListResponse } from '@/modules/pokemon/interfaces';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi.ts';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.PLAYING);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonsListResponse>('?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const pokemonId = Number(pokemon.url.split('/').slice(-2)[0]) || 0;

      return {
        id: pokemonId,
        name: pokemon.name,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.PLAYING;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (pokemonId: number) => {
    const hasWon = randomPokemon.value.id === pokemonId;
    if (hasWon) {
      gameStatus.value = GameStatus.WON;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.LOST;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    getNextRound,
    checkAnswer,
  };
};
