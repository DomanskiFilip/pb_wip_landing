<template>
  <client-only placeholder="Loading...">
    <App />
  </client-only>
</template>

<script setup>
// Import existing root Vue app and render it as the Nuxt index page.
// Use Nuxt's `~` alias (points at the `src/` dir) to avoid absolute '/src' resolution issues.
import App from "~/App.vue";
</script>
