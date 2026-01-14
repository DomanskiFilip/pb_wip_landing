<template>
  <div class="text-card">
    <h1>Socials</h1>
    <p>Step {{ stepIndex }} / {{ steps }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stepIndex: number;
  steps: number;
}>();
</script>


