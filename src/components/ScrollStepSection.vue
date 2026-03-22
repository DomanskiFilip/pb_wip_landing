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
const EXIT_THRESHOLD = 10; 
let lastStepTime = 0;
const COOLDOWN_MS = 400;


const hasSteps = computed(() => props.start !== props.end);
const activeStep = computed(() => props.overrideStep ?? currentStep.value);

const getImageUrl = (n: number) =>
  new URL(`../assets/images/${n}.png`, import.meta.url).href;

const step = (dir: 1 | -1) => {
  const now = Date.now();
  if (now - lastStepTime < COOLDOWN_MS) return;  // timestamp check instead
  
  const next = currentStep.value + dir;
  if (next >= props.start && next <= props.end) {
    currentStep.value = next;
    lastStepTime = now;  // record when step happened
    exitAttempts.value = 0;
  }
};

const handleWheel = (e: WheelEvent) => {
  if (!isActive.value || !hasSteps.value) return;
  if (Math.abs(e.deltaY) < 10) return; // ignore tiny movements

  const scrollingDown = e.deltaY > 0;
  const scrollingUp = e.deltaY < 0;
  const isAtEnd = currentStep.value === props.end;
  const isAtStart = currentStep.value === props.start;

  if (scrollingDown) {
    if (!isAtEnd) {
      e.preventDefault();
      step(1);
      return;
    } else {
      if (exitAttempts.value < EXIT_THRESHOLD) {
        e.preventDefault();
        exitAttempts.value++;
        return;
      }
    }
  } else if (scrollingUp) {
    if (isAtStart) return;

    e.preventDefault();
    exitAttempts.value = 0;
    step(-1);
  }
};

let touchStartY = 0;
const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0]?.clientY ?? 0;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isActive.value) return;
  const currentY = e.touches[0]?.clientY ?? 0;
  const delta = touchStartY - currentY;
  const isAtEnd = currentStep.value === props.end;

  if (!isAtEnd || (isAtEnd && delta > 0 && exitAttempts.value < 2)) {
    if (e.cancelable) e.preventDefault();
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndY = e.changedTouches[0]?.clientY ?? 0;
  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < 40) return;

  if (delta > 0) { // Scrolling Down
    if (currentStep.value < props.end) {
      step(1);
    } else {
      exitAttempts.value++;
    }
  } else { // Scrolling Up
    if (currentStep.value > props.start) {
      step(-1);
      exitAttempts.value = 0;
    }
  }
};

function tryStep(dir: 1 | -1): boolean {
  const next = currentStep.value + dir;
  if (next >= props.start && next <= props.end) {
    step(dir);
    return true;
  }
  return false;
}

defineExpose({ tryStep });

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
    { threshold: 0.5 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  window.addEventListener("wheel", handleWheel, { passive: false });
  sectionRef.value?.addEventListener("touchstart", handleTouchStart, { passive: true });
  sectionRef.value?.addEventListener("touchmove", handleTouchMove, { passive: false });
  sectionRef.value?.addEventListener("touchend", handleTouchEnd, { passive: true });

  onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener("wheel", handleWheel);
  });
});
</script>

<style scoped>
/* Keeping your existing styles... */
.scroll-wrapper {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
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
  transition: opacity 0.3s linear;
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
  overflow: visible;
}
.content-layer.align-left { left: 0; right: auto; }
.content-layer.align-center { left: 0; right: 0; margin: 0 auto; margin-top: 2rem; }
.content-layer.align-right { left: auto; right: 0; }

::v-deep(.text-card) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease-in-out;
  color: white;
}

.tap-hint {
  display: none;
  position: absolute;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  pointer-events: none;
  z-index: 20;
}

@media (max-width: 999px) {
  .content-layer {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
}

@media (hover: none) {
  .tap-hint { display: block; }
}
</style>