<script setup lang="ts">
interface Props {
  id: number;
  message: string;
  itsMine: boolean;
  image?: string;
}

defineProps<Props>();
</script>

<template>
  <!-- Example Message -->
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
      {{ message }}
    </div>
  </div>

  <!-- Example Received Message -->
  <div v-else class="flex">
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span>{{ message }}</span>
      <img v-if="image" :src="image" alt="Image Gif" class="w-52 h-52 object-cover rounded" />
    </div>
  </div>
</template>

<style scoped></style>
