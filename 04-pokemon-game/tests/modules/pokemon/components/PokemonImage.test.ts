import { mount, VueWrapper } from '@vue/test-utils';
import PokemonImage from '@/modules/pokemon/components/PokemonImage.vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('PokemonImage', () => {
  let wrapper: VueWrapper<any>;
  const initialProps = {
    pokemonId: 1,
    showPokemon: false,
  };

  beforeEach(() => {
    wrapper = mount(PokemonImage, {
      props: initialProps,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the hidden image when showPokemon props is false', () => {
    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toBe(
      `${import.meta.env.VITE_POKEMON_IMAGE_URL}${initialProps.pokemonId}.png`,
    );
    expect(img.classes()).toContain('brightness-0');
  });

  it('should render the imagen when showPokemon props is true', async () => {
    const img1 = wrapper.find('img');

    await wrapper.setProps({ showPokemon: true });

    const img2 = wrapper.find('img');

    expect(img2.exists()).toBeTruthy();
    expect(img2.attributes('src')).toBe(
      `${import.meta.env.VITE_POKEMON_IMAGE_URL}${initialProps.pokemonId}.png`,
    );

    expect(img1.attributes('alt')).toEqual('Pokemon Image 1');
    expect(img2.attributes('alt')).toEqual('Pokemon Image 2');

    expect(img1.classes()).toContain('brightness-0');
    expect(img2.classes()).not.toContain('brightness-0');
  });
});
