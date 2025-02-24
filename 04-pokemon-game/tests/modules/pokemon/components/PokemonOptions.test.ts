import type { VueWrapper } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const options = [
  { id: 1, name: 'bulbasaur' },
  { id: 2, name: 'ivysaur' },
  { id: 3, name: 'venusaur' },
  { id: 4, name: 'charmander' },
];

describe('PokemonOptions', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(PokemonOptions, {
      props: {
        pokemonsOptions: options,
        blockSelection: false,
        correctPokemonId: 1,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render buttons with correct text', () => {
    const getButtons = wrapper.findAll('button');

    expect(getButtons).toHaveLength(options.length);

    getButtons.forEach((btn, index) => {
      expect(btn.text()).toBe(options[index].name);
    });
  });

  it('should emit selectedOption event when a button is clicked', async () => {
    const firstBtn = wrapper.find('button');

    await firstBtn.trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted().selectedOption?.[0]).toEqual([options[0].id]);
  });

  it('should disabled buttons when blockSelection prop is true', async () => {
    await wrapper.setProps({ blockSelection: true });

    const getButtons = wrapper.findAll('button');

    getButtons.forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined();
    });
  });

  it('should apply correct styling to buttons based on correct/incorrect answer', async () => {
    const correctAnswer = 1;
    await wrapper.setProps({ correctPokemonId: correctAnswer, blockSelection: true });
    const getButtons = wrapper.findAll('button');

    await getButtons[0].trigger('click');

    expect(getButtons[0].classes()).toContain('correct');

    getButtons.forEach((btn, index) => {
      if (index !== 0) {
        expect(btn.classes()).toContain('incorrect');
      }
    });
  });
});
