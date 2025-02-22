import FirstCounter from '@/components/FirstCounter.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('FirstComponent', () => {
  let wrapper: VueWrapper<any>;
  const value = 5;

  beforeEach(() => {
    wrapper = mount(FirstCounter, {
      props: {
        value,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render count and square text', () => {
    const [countElement, squareElement] = wrapper.findAll('h3');

    expect(countElement.text()).toContain(`Counter: ${value}`);
    expect(squareElement.text()).toContain(`Square: ${Math.pow(value, 2)}`);
  });

  test('should increments the counter when +1 button is clicked', async () => {
    const [incrementButton] = wrapper.findAll('button');

    await incrementButton.trigger('click');

    const [countElement, squareElement] = wrapper.findAll('h3');

    expect(countElement.text()).toContain(`Counter: ${value + 1}`);
    expect(squareElement.text()).toContain(`Square: ${Math.pow(value + 1, 2)}`);
  });

  test('should decrements the counter when -1 button is clicked twice', async () => {
    const [, decrementButton] = wrapper.findAll('button');

    await decrementButton.trigger('click');
    await decrementButton.trigger('click');

    const [countElement, squareElement] = wrapper.findAll('h3');

    expect(countElement.text()).toContain(`Counter: ${value - 2}`);

    expect(squareElement.text()).toContain(`Square: ${Math.pow(value - 2, 2)}`);
  });
});
