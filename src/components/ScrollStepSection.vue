<template>
  <section ref="sectionRef" class="scroll-wrapper snap-point">
    <div class="bg-layer">
      <img
        v-for="n in imageCount"
        :key="n"
        :src="getImageUrl(n)"
        :class="{ active: activeStep === n || (!hasSteps && n === props.start) }"
        alt="background"
      />
    </div>
    <div class="content-layer" :class="`align-${align}`">
      <slot :stepIndex="currentStep - start + 1" :steps="end - start + 1" />
    </div>
    <p v-if="hasSteps" class="tap-hint">Tap to change background</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  start: number;
  end: number;
  totalImages?: number;
  align?: "left" | "center" | "right";
  overrideStep?: number | null;
}>();

const imageCount = computed(() => props.totalImages ?? 18);
const sectionRef = ref<HTMLElement | null>(null);
const currentStep = ref(props.start);
const isActive = ref(false);

const exitAttempts = ref(0);
// Increase this slightly for Mac trackpads to ensure intent
const EXIT_THRESHOLD = 2; 
let lastWheelTime = 0;
const SCROLL_COOLDOWN = 600; 

const hasSteps = computed(() => props.start !== props.end);
const activeStep = computed(() => props.overrideStep ?? currentStep.value);

const getImageUrl = (n: number) =>
  new URL(`../assets/images/${n}.png`, import.meta.url).href;

const step = (dir: 1 | -1) => {
  const next = currentStep.value + dir;
  if (next >= props.start && next <= props.end) {
    currentStep.value = next;
    exitAttempts.value = 0;
  }
};

const handleWheel = (e: WheelEvent) => {
  if (!isActive.value || !hasSteps.value) return;

  const isAtEnd = currentStep.value === props.end;
  const isAtStart = currentStep.value === props.start;
  const scrollingDown = e.deltaY > 0;

  // CRITICAL: If we are in the middle of steps, we MUST preventDefault
  // to stop the Mac from scrolling the actual webpage.
  if (scrollingDown && !isAtEnd) {
    e.preventDefault();
  } else if (!scrollingDown && !isAtStart) {
    e.preventDefault();
  } else if (scrollingDown && isAtEnd && exitAttempts.value < EXIT_THRESHOLD) {
    // Hold the user at the end of the section for a few "notches"
    e.preventDefault();
  }

  // Threshold to ignore tiny trackpad jitters
  if (Math.abs(e.deltaY) < 10) return;

  const now = Date.now();
  if (now - lastWheelTime < SCROLL_COOLDOWN) return;

  if (scrollingDown) {
    if (!isAtEnd) {
      step(1);
      lastWheelTime = now;
    } else if (exitAttempts.value < EXIT_THRESHOLD) {
      exitAttempts.value++;
      lastWheelTime = now;
    }
  } else {
    if (!isAtStart) {
      step(-1);
      lastWheelTime = now;
    } else {
      exitAttempts.value = 0;
    }
  }
};

// Touch logic remains the same but with added preventDefault safety
const handleTouchMove = (e: TouchEvent) => {
  if (!isActive.value || !hasSteps.value) return;
  const isAtEnd = currentStep.value === props.end;
  const isAtStart = currentStep.value === props.start;

  // Only prevent default if we aren't trying to leave the section
  if (!isAtEnd && !isAtStart) {
    if (e.cancelable) e.preventDefault();
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      isActive.value = entry.isIntersecting;
      if (entry.isIntersecting) {
        exitAttempts.value = 0;
      }
    },
    { threshold: 0.6 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  window.addEventListener("wheel", handleWheel, { passive: false });
  sectionRef.value?.addEventListener("touchmove", handleTouchMove, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleWheel);
});

function tryStep(dir: 1 | -1): boolean {
  const next = currentStep.value + dir;
  if (next >= props.start && next <= props.end) {
    step(dir);
    return true;
  }
  return false;
}
defineExpose({ tryStep });
</script>

<style scoped>
.scroll-wrapper {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  contain: paint; 
}

.bg-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bg-layer img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.bg-layer img.active {
  opacity: 1;
}

.content-layer {
  width: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: right;
  padding-top: 10vh;
}

.content-layer.align-left { left: 0; right: auto; }
.content-layer.align-center { left: 0; right: 0; margin: 0 auto; justify-content: center; }
.content-layer.align-right { left: auto; right: 0; }

::v-deep(.text-card) {
  background: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -5px 5px 15px  rgba(255, 255, 255, 0.4);
  color: white;
  max-width: 80%;
}

@media (max-width: 999px) {
  .content-layer {
    width: 100%;
    justify-content: center;
    padding: 2rem;
    padding-top: 5vh;
  }
}
</style>