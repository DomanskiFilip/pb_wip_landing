<template>
  <div class="video-wrapper">
    <video autoplay muted loop playsinline id="top-banner-video">
      <source src="../assets/videos/MCCM-Banner2-v9.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

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
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>