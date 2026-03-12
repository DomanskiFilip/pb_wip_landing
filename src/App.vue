<template>
  <main id="main-scroll-container" class="scroll-root">
    <TopBannerAnim class="snap-point" />

    <!-- Intro (no steps needed) -->
    <ScrollStepSection :start="1" :end="1" align="center">
      <IntroductionSection />
    </ScrollStepSection>

    <ScrollStepSection :start="2"  :end="12" v-slot="{ stepIndex, steps }" align="right">
      <WeNeedYouSection :stepIndex="stepIndex" :steps="steps" />
    </ScrollStepSection>

    <!-- Socials -->
    <ScrollStepSection :start="13" :end="18" v-slot="{ stepIndex, steps }" align="left">
      <SocialsAndSponsorsSection :stepIndex="stepIndex" :steps="steps"/>
    </ScrollStepSection>
  </main>
  <div class="scroll-indicator">
    <span>Scroll</span>
  </div>
  <footer>We are in no way affiliated with Mojang or Microsoft. This is a fan-made community project.</footer>
</template>

<script setup lang="ts">
import TopBannerAnim from './components/TopBannerAnim.vue';
import ScrollStepSection from './components/ScrollStepSection.vue';
import IntroductionSection from './components/IntroductionSection.vue';
import WeNeedYouSection from './components/WeNeedYouSection.vue';
import SocialsAndSponsorsSection from './components/SocialsAndSponsorsSection.vue';
</script>


<style>
.scroll-root {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: auto;
  overscroll-behavior-y: contain;
  
    /*  Hide scrollbar for Chrome, Safari, and newer versions of Edge */
    &::-webkit-scrollbar {
      display: none;
    }
  
    /*  Hide scrollbar for Firefox */
    scrollbar-width: none;
  
    /*  Hide scrollbar for IE and older Edge */
    -ms-overflow-style: none;
}

.snap-point {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.scroll-indicator {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    color: #ffffff;
    font-size: 0.9rem;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.3rem;
  text-align: center;
  font-size: 0.8rem;
  color: #555;
  background-color: black;
  z-index: 5;
}
</style>
