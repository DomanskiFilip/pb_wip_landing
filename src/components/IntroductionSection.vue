<template>
  <div class="text-card">
    <div>
      <img :src="Beacon" alt="Project Beacon Logo" />
      <h1>Project Beacon</h1>
    </div>
    <p>“a Minecraft movie for the community by the community”</p>
  </div>
</template>

<script setup>
import Beacon from "../assets/images/Beacon.png";
</script>

<style scoped>
.text-card {
  width: 100%;
}

.text-card div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-card div img {
  width: 80px;
  margin-right: 0.5rem;
}

.text-card div h1 {
  font-weight: bold;
}

.text-card p {
  text-align: center;
}
</style>
