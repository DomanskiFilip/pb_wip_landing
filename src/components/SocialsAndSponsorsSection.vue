<template>
  <div class="text-card">
    <div class="social-media">
      <a
        href="https://www.youtube.com/@projectbeaconworld"
        target="_blank"
        class="social-link youtube-link"
      >
        <img
          src="../assets/images/YouTube_icon.png"
          alt="YouTube"
          class="social-icon"
        />
      </a>

      <img
        src="../assets/images/search.png"
        alt="Minecraft Characters"
        class="minecraft-characters"
      />

      <a
        href="http://discord.gg/n92fmjhw8v"
        target="_blank"
        class="social-link discord-link"
      >
        <img
          src="../assets/images/discord.png"
          alt="Discord"
          class="social-icon"
        />
      </a>

      <p class="social-text">
        Be on the lookout for more news on our social media!
      </p>
    </div>

    <div class="sponsors">
      <h2 class="sponsors-title">SPONSORS:</h2>
      <div class="sponsor-logos">
        <img
          src="../assets/images/YouTrack.png"
          alt="YouTrack by JetBrains"
          class="sponsor-logo youtrack-logo"
        />
        <img
          src="../assets/images/24fire-white.png"
          alt="24 Fire Gold Partner"
          class="sponsor-logo fire-logo"
        />
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
            fill="#ffffff">
            <path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/></svg></a>
      </p>
      <p>
        Design:
        YannMan,
        cosston,
        speed_shark
      </p>
      <p>
        Editorial:
        <a href="https://x.com/1m5rian" target="_blank">
          m5rian
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 -960 960 960"
            width="12px"
            fill="#ffffff">
            <path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/></svg></a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Main Container */
.text-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 17rem;
}

.social-media {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.social-link {
  position: absolute;
  top: 10%;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.youtube-link {
  left: 7.5%;
}

.discord-link {
  right: 7.5%;
}

.social-icon {
  width: 80px;
  height: auto;
  display: block;
}

.social-link:hover {
  transform: scale(1.15);
  cursor: pointer;
}

.social-link:active {
  transform: scale(0.9);
}

.minecraft-characters {
  width: 300px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 30px;
}

.social-text {
  font-size: 24px;
  line-height: 1.5;
  margin-top: 150px;
  text-align: center;
}

.sponsors {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.sponsors-title {
  font-size: 30px;
  margin-bottom: 30px;
}

.sponsor-logos {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 40px;
}

.sponsor-logo {
  height: 80px;
  width: auto;
  object-fit: contain;
}

.youtrack-logo {
  height: 90px;
}

.fire-logo {
  height: 100px;
}

#credits {
  margin-top: 10px;
}

#credits p {
  font-size: 12px;
  margin: 2px 0;
}

#credits a {
  color: #ffffff;
  text-decoration: none;
}

/* Responsive Scaling */
@media (max-width: 768px) {
  .social-icon {
    width: 60px;
  }
  .youtube-link {
    left: 5%;
  }
  .discord-link {
    right: 5%;
  }
  .minecraft-characters {
    width: 200px;
  }
  .social-text {
    font-size: 20px;
    margin-top: 120px;
  }
  .sponsors-title {
    font-size: 24px;
  }
  .sponsor-logos {
    flex-direction: column;
    gap: 30px;
  }
  .sponsor-logo {
    height: 70px;
  }
}

@media (max-width: 480px) {
  .social-icon {
    width: 50px;
  }
  .youtube-link {
    left: 2%;
  }
  .discord-link {
    right: 2%;
  }
  .minecraft-characters {
    width: 150px;
  }
  .social-text {
    font-size: 18px;
    margin-top: 100px;
  }
}
</style>
