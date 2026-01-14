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
