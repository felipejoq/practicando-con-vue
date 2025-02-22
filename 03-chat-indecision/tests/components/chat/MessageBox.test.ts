import { afterEach, describe, expect, test } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import MessagesBox from '@/components/chat/MessagesBox.vue';
import exp from 'node:constants';

describe('MessageBox', () => {
  let wrapper: VueWrapper<any>;
  const message = 'Hello';

  beforeEach(() => {
    wrapper = mount(MessagesBox);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render input text correctly', () => {
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Type your message...');
  });

  test('should render send button correctly', () => {
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.html()).toContain('svg');
  });

  // Emit event
  test('should emit sendMessage event when click on send button', async () => {
    const input = wrapper.find('input');
    await input.setValue(message);
    const button = wrapper.find('button');
    await button.trigger('click');

    const sendMessageEvent = wrapper.emitted('sendMessage');

    expect(sendMessageEvent).toHaveLength(1);
  });

  test("should dosen't emit sendMessage event when click on send button with empty message", async () => {
    const button = wrapper.find('button');
    await button.trigger('click');

    const sendMessageEvent = wrapper.emitted('sendMessage');

    expect(sendMessageEvent).toBeUndefined();
  });

  test('should emit sendMessage event when press enter key', async () => {
    const input = wrapper.find('input');
    await input.setValue(message);
    await input.trigger('keydown.enter');

    const sendMessageEvent = wrapper.emitted('sendMessage');

    // check message
    expect(sendMessageEvent).toHaveLength(1);
    expect(sendMessageEvent?.[0]).toEqual([message]);
  });
});
