<template>
  <main id="main-scroll-container" class="scroll-root" @scroll="onScroll">
    <TopBannerAnim class="snap-point" data-section="banner" />

    <ScrollStepSection :start="1" :end="1" align="center" data-section="about">
      <IntroductionSection />
    </ScrollStepSection>

    <ScrollStepSection
      :start="2"
      :end="12"
      v-slot="{ stepIndex, steps }"
      align="right"
      data-section="about"
      ref="weNeedYouRef"
    >
      <WeNeedYouSection :stepIndex="stepIndex" :steps="steps" />
    </ScrollStepSection>

    <ScrollStepSection
      :start="13"
      :end="18"
      align="left"
      data-section="socials"
      :overrideStep="socialsHoverStep"
      ref="socialsRef"
    >
      <SocialsAndSponsorsSection @hover-step="socialsHoverStep = $event" />
    </ScrollStepSection>
  </main>

  <nav class="section-nav">
    <button class="nav-arrow" @click="navigateUp" aria-label="Previous">
      ▲
    </button>

    <button
      v-for="section in sections"
      :key="section.id"
      class="nav-item"
      :class="{ active: activeSection === section.id }"
      @click="scrollToSection(section.scrollIndex)"
    >
      <span class="nav-label">{{ section.label }}</span>
    </button>

    <button class="nav-arrow" @click="navigateDown" aria-label="Next">
      ▼
    </button>
  </nav>

  <footer>
    We are in no way affiliated with Mojang or Microsoft. This is a fan-made
    community project.
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TopBannerAnim from "./components/TopBannerAnim.vue";
import ScrollStepSection from "./components/ScrollStepSection.vue";
import IntroductionSection from "./components/IntroductionSection.vue";
import WeNeedYouSection from "./components/WeNeedYouSection.vue";
import SocialsAndSponsorsSection from "./components/SocialsAndSponsorsSection.vue";

const sections = [
  { id: "banner", label: "Banner", scrollIndex: 0 },
  { id: "about", label: "About", scrollIndex: 1 },
  { id: "socials", label: "Socials", scrollIndex: 3 },
];

const activeSection = ref("banner");
const socialsHoverStep = ref<number | null>(null);
const weNeedYouRef = ref<InstanceType<typeof ScrollStepSection> | null>(null);
const socialsRef = ref<InstanceType<typeof ScrollStepSection> | null>(null);

function scrollToSection(index: number) {
  const container = document.getElementById("main-scroll-container");
  if (!container) return;
  const target = container.children[index] as HTMLElement;
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

// Returns which scroll-container child index is currently snapped
function getCurrentSnappedIndex(): number {
  const container = document.getElementById("main-scroll-container");
  if (!container) return 0;
  const children = Array.from(container.children) as HTMLElement[];
  const scrollTop = container.scrollTop;
  let closest = 0;
  let minDist = Infinity;
  children.forEach((child, i) => {
    const dist = Math.abs(child.offsetTop - scrollTop);
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  return closest;
}

function navigateDown() {
  const snapped = getCurrentSnappedIndex();
  const container = document.getElementById("main-scroll-container");
  if (!container) return;
  const children = Array.from(container.children) as HTMLElement[];

  // Section 2 (scrollIndex 2) = WeNeedYou, has steps 2–12
  if (snapped === 2 && weNeedYouRef.value) {
    const advanced = weNeedYouRef.value.tryStep(1);
    if (advanced) return;
  }

  // Section 3 (scrollIndex 3) = Socials, has steps 13–18
  if (snapped === 3 && socialsRef.value) {
    const advanced = socialsRef.value.tryStep(1);
    if (advanced) return;
  }

  // Otherwise scroll to next snap section
  const next = snapped + 1;
  if (next < children.length) {
    (children[next] as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

function navigateUp() {
  const snapped = getCurrentSnappedIndex();
  const container = document.getElementById("main-scroll-container");
  if (!container) return;
  const children = Array.from(container.children) as HTMLElement[];

  // Section 2 = WeNeedYou
  if (snapped === 2 && weNeedYouRef.value) {
    const retreated = weNeedYouRef.value.tryStep(-1);
    if (retreated) return;
  }

  // Section 3 = Socials
  if (snapped === 3 && socialsRef.value) {
    const retreated = socialsRef.value.tryStep(-1);
    if (retreated) return;
  }

  // Otherwise scroll to previous snap section
  const prev = snapped - 1;
  if (prev >= 0) {
    (children[prev] as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

function onScroll() {
  const container = document.getElementById("main-scroll-container");
  if (!container) return;
  const scrollTop = container.scrollTop;
  const height = container.clientHeight;
  const children = Array.from(container.children) as HTMLElement[];

  const bannerBottom = (children[0]?.offsetTop ?? 0) + (children[0]?.offsetHeight ?? 0);
  const socialsTop = children[3]?.offsetTop ?? Infinity;

  if (scrollTop + height / 2 < bannerBottom) {
    activeSection.value = "banner";
  } else if (scrollTop + height / 2 >= socialsTop) {
    activeSection.value = "socials";
  } else {
    activeSection.value = "about";
  }
}

onMounted(() => {
  const container = document.getElementById("main-scroll-container");
  container?.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  const container = document.getElementById("main-scroll-container");
  container?.removeEventListener("scroll", onScroll);
});
</script>

<style>
.scroll-root {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: auto;
  overscroll-behavior-y: contain;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.snap-point {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.section-nav {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 0.25rem 0.35rem;
}

.nav-item {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

.nav-label {
  font-size: 0.6rem;
  font-family: "MinecraftFonts", sans-serif;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.35);
  transition:
    color 0.25s ease,
    font-size 0.25s ease;
  display: block;
}

.nav-item.active .nav-label {
  color: #ffffff;
  font-size: 0.72rem;
}

.nav-arrow {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.55rem;
  line-height: 1;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-arrow:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
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
  z-index: 20;
}

@media (max-width: 480px) {
  .section-nav {
    bottom: 3.5rem;
  }
}
</style>
