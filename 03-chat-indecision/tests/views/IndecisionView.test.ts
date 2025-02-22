import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IndecisionView from '@/views/IndecisionView.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessagesBox from '@/components/chat/MessagesBox.vue';

describe('IndecisionView', () => {
  // Match with snapshot
  test('should snapshot compare and other components are presents', () => {
    const wrapper = mount(IndecisionView);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
    expect(wrapper.findComponent(MessagesBox).exists()).toBe(true);
  });
});
