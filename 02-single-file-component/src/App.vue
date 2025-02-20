<script setup lang="ts">
import FirstCounter from '@/components/FirstCounter.vue';
import FirstCounterScript from '@/components/FirstCounterScript.vue';
import FirstCounterScript2 from '@/components/FirstCounterScript/FirstCounterScript2.vue';
</script>

<template>
  <h1 class="text-center my-4">My First App with Vue</h1>
  <!-- v-bind para asociar una propiedad. En este caso es la forma corta -->
  <div class="container flex justify-center gap-4 mx-auto">
    <FirstCounter :value="1" />
    <FirstCounterScript :value="2" />
    <FirstCounterScript2 :value="3" />
  </div>
</template>

<style scoped></style>
