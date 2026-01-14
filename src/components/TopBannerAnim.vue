<template>
  <div class="video-wrapper">
    <video autoplay muted loop playsinline id="top-banner-video">
      <source :src="banner" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img :src="banner_title" alt="Banner Title Image" />
  </div>
</template>

<script setup lang="ts">
import banner from '../assets/videos/MCCM-Banner2-v9.mp4';
import banner_title from '../assets/images/banner-title.png';
</script>

<style scoped>
.video-wrapper {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  background-color: #000;
}

#top-banner-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 50%;
  height: 35%;
}
</style>
