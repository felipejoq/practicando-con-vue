<script setup lang="ts">
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessagesBox from '@/components/chat/MessagesBox.vue';
import { useChat } from '@/composables/useChat.ts';

const { messages, onMessage } = useChat();
</script>

<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Random Guest</span>
    </div>

    <ChatMessages :messages="messages" />
    <MessagesBox @send-message="onMessage" />
  </div>
</template>

<style scoped></style>
