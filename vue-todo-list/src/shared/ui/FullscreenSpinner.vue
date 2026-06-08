<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="isLoading" class="spinner-container">
    <img class="spinner" src="https://i.pinimg.com/originals/e2/63/00/e26300c0c746d3163a0f48223c897cee.gif" alt="">
  </div>
</template>

<style scoped>
.spinner-container {
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
