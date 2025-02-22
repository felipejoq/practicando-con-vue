import { mount, VueWrapper } from '@vue/test-utils';
import ChatBubble from '@/components/chat/ChatBubble.vue';
import { expect, test, describe, beforeEach, afterEach } from 'vitest';

describe('ChatBubble', () => {
  let wrapper: VueWrapper<any>;
  let wrapper2: VueWrapper<any>;
  const props = {
    id: 1,
    message: 'Hello',
    itsMine: true,
  };
  const props2 = {
    id: 2,
    message: 'Yes',
    itsMine: false,
    image: 'https://cdn.vuetifyjs.com/images/john.jpg',
  };

  beforeEach(() => {
    wrapper = mount(ChatBubble, {
      props,
    });
    wrapper2 = mount(ChatBubble, {
      props: props2,
    });
  });
  afterEach(() => {
    wrapper.unmount();
    wrapper2.unmount();
  });

  test('should snapshot compare', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should add class for itsMine bubble', () => {
    expect(wrapper.find('.justify-end').exists()).toBe(true);
  });

  test('should show message', () => {
    expect(wrapper.text()).toContain('Hello');
  });

  test('should show message Yes', () => {
    expect(wrapper2.text()).toContain('Yes');
  });

  test('should not justify-end class for not itsMine bubble', () => {
    expect(wrapper2.find('.justify-end').exists()).toBe(false);
  });

  test('should show image', () => {
    expect(wrapper2.find('img').exists()).toBe(true);
  });

  test('should show image', () => {
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper2.find('img').exists()).toBe(true);
  });

  test('should not render image if not provided', () => {
    const wrapperSpecial = mount(ChatBubble, {
      props: {
        id: 1,
        message: 'Yes',
        itsMine: false,
      },
    });

    expect(wrapperSpecial.find('img').exists()).toBe(false);
  });
});
