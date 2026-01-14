<template>
  <div class="text-card">
    <h1>We Need You</h1>
    <p>Step {{ stepIndex }} / {{ steps }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stepIndex: number;
  steps: number;
}>();
</script>

<style scoped>
div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  max-width: 600px;
  color: white;
}
</style>
