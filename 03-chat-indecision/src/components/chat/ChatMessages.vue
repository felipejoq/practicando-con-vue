<script setup lang="ts">
import ChatBubble from '@/components/chat/ChatBubble.vue';
import type { IChatMessage } from '@/interfaces/chat-message.interface.ts';
import { nextTick, ref, watch } from 'vue';

interface Props {
  messages: IChatMessage[];
}

const props = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

watch(
  () => props.messages,
  () => {
    setTimeout(() => {
      chatRef.value?.scrollTo({
        top: chatRef.value.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  },
);
</script>

<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <ChatBubble v-for="message in props.messages" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>
