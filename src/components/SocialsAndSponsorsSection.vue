<template>
  <div class="section-wrapper">
    <div class="text-card">
      <img
        src="../assets/images/search.png"
        alt="Minecraft Characters"
        class="minecraft-characters"
      />

      <p class="social-text">
        Be on the lookout for more news on our social media!
      </p>

      <!-- Each link emits its bg image index on hover; null on leave = back to 13 -->
      <div class="social-icons-row">
        <a
          href="http://discord.gg/n92fmjhw8v"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 14)"
          @mouseleave="emit('hover-step', null)"
        >
          <img src="../assets/images/discord.png" alt="Discord" class="social-icon" />
        </a>
        <a
          href="https://www.youtube.com/@projectbeaconworld"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 15)"
          @mouseleave="emit('hover-step', null)"
        >
          <img src="../assets/images/YouTube_icon.png" alt="YouTube" class="social-icon" />
        </a>
        <a
          href="https://www.youtube.com/@projectbeaconworld"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 16)"
          @mouseleave="emit('hover-step', null)"
        >
          <img src="../assets/images/Blog_icon.png" alt="Blog" class="social-icon" />
        </a>
      </div>

      <div class="sponsors">
        <h2 class="sponsors-title">Special Thanks to our sponsors!</h2>
        <div class="sponsor-logos">
          <a
            href="https://youtrack.projectbeacon.world/"
            target="_blank"
            @mouseenter="emit('hover-step', 17)"
            @mouseleave="emit('hover-step', null)"
          >
            <img src="../assets/images/YouTrack-white.png" alt="YouTrack by JetBrains" class="sponsor-logo youtrack-logo" />
          </a>
          <a
            href="https://24fire.de/?ref=beacon"
            target="_blank"
            @mouseenter="emit('hover-step', 18)"
            @mouseleave="emit('hover-step', null)"
          >
            <img src="../assets/images/24fire-white.png" alt="24 Fire Gold Partner" class="sponsor-logo fire-logo" />
          </a>
        </div>
      </div>

      <div id="credits">
        <p>Created with ❤️ by the Project Beacon team:</p>
        <p>
          Web Development:
          <a href="https://filip.adappstudio.co.uk/" target="_blank">
            Filip Domanski
            <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#ffffff">
              <path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/>
            </svg>
          </a>
        </p>
        <p>Design: YannMan, cosston, speed_shark</p>
        <p>
          Editorial:
          <a href="https://x.com/1m5rian" target="_blank">
            m5rian
            <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#ffffff">
              <path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/>
            </svg>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'hover-step', step: number | null): void
}>()
</script>

<style scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto 10vw auto 2vw;
}

.text-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  padding: 30px 32px 28px;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}

.minecraft-characters {
  position: absolute;
  top: -260px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: auto;
  z-index: 10;
  pointer-events: none;
}

.social-text {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin: 0 0 24px;
}

.social-icons-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  margin-bottom: 32px;
}

.social-link {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-link:hover  { transform: scale(1.15); }
.social-link:active { transform: scale(0.9); }

.social-icon {
  width: 80px;
  height: auto;
  display: block;
}

.sponsors {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
}

.sponsors-title {
  font-size: 22px;
  margin: 0 0 16px;
}

.sponsor-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 32px;
  flex-wrap: wrap;
}

.sponsor-logos a {
  display: inline-flex;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sponsor-logos a:hover  { transform: scale(1.1); }
.sponsor-logos a:active { transform: scale(0.9); }

.sponsor-logo  { height: 70px; width: auto; object-fit: contain; }
.youtrack-logo { height: 80px; }
.fire-logo     { height: 90px; }

#credits {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 16px;
}

#credits p { font-size: 12px; margin: 2px 0; }
#credits a { color: #ffffff; text-decoration: none; }

@media (max-width: 768px) {
  .minecraft-characters { width: 300px; top: -120px; }
  .text-card     { padding-top: 160px; }
  .social-icon   { width: 64px; }
  .sponsors-title { font-size: 18px; }
  .sponsor-logo  { height: 60px; }
  .youtrack-logo { height: 68px; }
  .fire-logo     { height: 75px; }
}

@media (max-width: 480px) {
  .minecraft-characters { width: 220px; top: -90px; }
  .text-card {
    padding-top: 130px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .social-text   { font-size: 16px; }
  .social-icon   { width: 52px; }
  .sponsor-logos { gap: 20px; }
}
</style>