import { mount, VueWrapper } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import type { IChatMessage } from '@/interfaces/chat-message.interface.ts';

describe('ChatMessages', () => {
  let wrapper: VueWrapper<any>;
  const messages: IChatMessage[] = [
    { id: 1, message: 'Hello', itsMine: true },
    { id: 2, message: 'Hi', itsMine: false, image: 'https://cdn.vuetifyjs.com/images/john.jpg' },
  ];

  beforeEach(() => {
    wrapper = mount(ChatMessages, {
      props: { messages },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should render messages', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
    expect(chatBubbles.length).toBe(messages.length);
    expect(chatBubbles[0].props()).toMatchObject(messages[0]);
    expect(chatBubbles[1].props()).toMatchObject(messages[1]);
  });

  test('should scroll to bottom when messages change', async () => {
    vi.useFakeTimers();
    const scrollToMock = vi.fn();

    const newMessages: IChatMessage[] = [
      ...messages,
      { id: 3, message: 'How are you?', itsMine: true },
    ];

    await wrapper.setProps({ messages: newMessages });

    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    chatRef.scrollTo = scrollToMock;

    vi.runAllTimers();

    expect(scrollToMock).toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledWith({ top: expect.any(Number), behavior: 'smooth' });
  });
});
