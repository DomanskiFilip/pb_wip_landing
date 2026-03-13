<template>
  <div class="video-wrapper">
    <!-- Placeholder shown while video loads -->
    <div class="placeholder" :class="{ hidden: videoReady }"></div>

    <video
      autoplay
      muted
      loop
      playsinline
      id="top-banner-video"
      :class="{ visible: videoReady }"
      @canplay="onCanPlay"
    >
      <source :src="banner" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img :src="banner_title" alt="Banner Title Image" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import banner from '../assets/videos/Banner.mp4';
import banner_title from '../assets/images/banner-title.png';

const videoReady = ref(false);

function onCanPlay() {
  videoReady.value = true;
}
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

/* Placeholder static image */
.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/18.png');
  background-size: cover;
  background-position: center;
  z-index: 1;
  opacity: 1;
  transition: opacity 0.6s ease;
}

.placeholder.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Video starts invisible, fades in when ready */
#top-banner-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

#top-banner-video.visible {
  opacity: 1;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* bumped above placeholder */
  width: 50%;
  height: 35%;
}

@media (max-width: 999px) {
  img {
    width: 85%;
    height: auto;
  }
}
</style>