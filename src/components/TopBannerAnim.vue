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
    <h3 class="coming-soon">coming soon...</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import banner from "../assets/videos/Banner.mp4";
import banner_title from "../assets/images/banner-title.png";

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
  background-image: url("../assets/images/firstframe.png");
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
  z-index: 2;
  width: 50%;
  max-width: 1100px;
  height: 35%;
  max-height: 650px;
  pointer-events: none;
}

.coming-soon {
  position: absolute;
  top: 65%;
  left: 66%;
  z-index: 3;
  display: inline-block;
  color: hsl(66, 100%, 50%);
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  padding: 0.35em 0.9em;
  letter-spacing: 0.06em;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(330deg);
  animation: coming-pulse 1.6s ease-in-out infinite;
  pointer-events: none;
  filter: drop-shadow(0 2px 5px hsl(66, 100%, 50%));
}

@media (max-width: 999px) {
  img {
    width: 85%;
    height: auto;
  }

  .coming-soon {
    font-size: 1.25rem;
    top: 55%;
    left: 72%;
    padding: 0.25em 0.6em;
    transform: translate(-50%, -50%) rotate(330deg) scale(0.92);
  }
}

/* Pulsating animation that scales */
@keyframes coming-pulse {
  0% {
    transform: translate(-50%, -50%) rotate(330deg) scale(1);
    opacity: 0.95;
  }
  50% {
    transform: translate(-50%, -50%) rotate(330deg) scale(1.12);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(330deg) scale(1);
    opacity: 0.95;
  }
}
</style>
