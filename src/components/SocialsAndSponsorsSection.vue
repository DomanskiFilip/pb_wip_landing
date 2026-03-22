<template>
  <div class="section-wrapper" @click="onWrapperTap">
    <img
      src="../assets/images/search.png"
      alt="Minecraft Characters"
      class="minecraft-characters"
    />
    <div class="text-card">
      <p class="social-text">
        Be on the lookout for more news on our social media!
      </p>

      <div class="social-icons-row">
        <a
          href="http://discord.gg/n92fmjhw8v"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 14)"
          @mouseleave="emit('hover-step', null)"
        >
          <img
            src="../assets/images/discord.png"
            alt="Discord"
            class="social-icon"
          />
        </a>
        <a
          href="https://www.youtube.com/@projectbeaconworld"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 15)"
          @mouseleave="emit('hover-step', null)"
        >
          <img
            src="../assets/images/YouTube_icon.png"
            alt="YouTube"
            class="social-icon"
          />
        </a>
        <a
          href="https://blog.projectbeacon.world/posts/"
          target="_blank"
          class="social-link"
          @mouseenter="emit('hover-step', 16)"
          @mouseleave="emit('hover-step', null)"
        >
          <img
            src="../assets/images/Blog_icon.png"
            alt="Blog"
            class="social-icon"
          />
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
            <img
              src="../assets/images/YouTrack-white.png"
              alt="YouTrack by JetBrains"
              class="sponsor-logo youtrack-logo"
            />
          </a>
          <a
            href="https://24fire.de/?ref=beacon"
            target="_blank"
            @mouseenter="emit('hover-step', 18)"
            @mouseleave="emit('hover-step', null)"
          >
            <img
              src="../assets/images/24fire-white.png"
              alt="24 Fire Gold Partner"
              class="sponsor-logo fire-logo"
            />
          </a>
        </div>
      </div>

      <div id="credits">
        <p>Created with ❤️ by the Project Beacon team:</p>
        <p>
          Web Development:
          <a href="https://filip.adappstudio.co.uk/" target="_blank">
            Filip Domanski
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12px"
              viewBox="0 -960 960 960"
              width="12px"
              fill="#ffffff"
            >
              <path
                d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"
              />
            </svg>
          </a>
        </p>
        <p>Design: YannMan, cosston, speed_shark</p>
        <p>
          Editorial:
          <a href="https://x.com/1m5rian" target="_blank">
            m5rian
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12px"
              viewBox="0 -960 960 960"
              width="12px"
              fill="#ffffff"
            >
              <path
                d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"
              />
            </svg>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "hover-step", step: number | null): void;
}>();

const BG_STEPS = [14, 15, 16, 17, 18];
const tapIndex = ref(-1); // -1 = default (13)

const onWrapperTap = (e: MouseEvent | TouchEvent) => {
  // Only act if the tap wasn't on a link/button — let those handle themselves
  if ((e.target as HTMLElement).closest("a")) return;
  tapIndex.value = (tapIndex.value + 1) % (BG_STEPS.length + 1);
  // After cycling past the last sponsor, reset to default
  if (tapIndex.value === BG_STEPS.length) {
    tapIndex.value = -1;
    emit("hover-step", null);
  } else {
    const stepToSend = BG_STEPS[tapIndex.value];
    if (stepToSend !== undefined) {
      emit("hover-step", stepToSend);
    } else {
      // Fallback or handle unexpected undefined, though it shouldn't happen with the modulo logic the error trigers on build
      emit("hover-step", null);
    }
  }
};
</script>

<style scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto 10vw auto 2vw;
  position: relative;
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
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: auto;
  z-index: 20;
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

.social-link:hover {
  transform: scale(1.15);
}
.social-link:active {
  transform: scale(0.9);
}

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

.sponsor-logos a:hover {
  transform: scale(1.1);
}
.sponsor-logos a:active {
  transform: scale(0.9);
}

.sponsor-logo {
  height: 70px;
  width: auto;
  object-fit: contain;
}
.youtrack-logo {
  height: 80px;
}
.fire-logo {
  height: 90px;
}

#credits {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 16px;
}

#credits p {
  font-size: 12px;
  margin: 2px 0;
}
#credits a {
  color: #ffffff;
  text-decoration: none;
}

.tap-hint {
  display: none;
}

@media (max-width: 999px) {
  .section-wrapper {
    margin: 10rem 0;
    justify-content: center;
  }

  .text-card {
    max-width: 95vw;
    max-height: 85vh;
    overflow-y: auto;
  }

  .minecraft-characters {
    width: 280px;
    top: -210px;
  }

  .social-text {
    font-size: 16px;
  }
  .social-icon {
    width: 60px;
  }
  .sponsors-title {
    font-size: 18px;
  }
  .sponsor-logo {
    height: 58px;
  }
  .youtrack-logo {
    height: 65px;
  }
  .fire-logo {
    height: 72px;
  }

  .tap-hint {
    display: block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 8px;
    text-align: center;
    pointer-events: none;
    letter-spacing: 0.05em;
  }
}

@media (max-width: 480px) {
  .text-card {
    padding-left: 16px;
    padding-right: 16px;
  }

  .minecraft-characters {
    width: 210px;
    top: -155px;
  }

  .social-icon {
    width: 50px;
  }
  .sponsor-logos {
    gap: 16px;
  }
  .sponsor-logo {
    height: 48px;
  }
  .youtrack-logo {
    height: 54px;
  }
  .fire-logo {
    height: 60px;
  }
}
</style>
