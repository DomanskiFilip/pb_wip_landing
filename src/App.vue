<template>
  <main id="main-scroll-container" class="scroll-root">
    <TopBannerAnim class="snap-point" />

    <!-- Intro (no steps needed) -->
    <ScrollStepSection :start="1" :end="1">
      <IntroductionSection />
    </ScrollStepSection>

    <ScrollStepSection :start="2"  :end="6" v-slot="{ stepIndex, steps }">
      <WeNeedYouSection :stepIndex="stepIndex" :steps="steps" />
    </ScrollStepSection>

    <!-- Socials -->
    <ScrollStepSection :start="7" :end="11" v-slot="{ stepIndex, steps }">
      <SocialsAndSponsorsSection :stepIndex="stepIndex" :steps="steps"/>
    </ScrollStepSection>
  </main>
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
</style>
