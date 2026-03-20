<template>
  <section ref="sectionRef" class="scroll-wrapper snap-point">
    <!-- Background -->
    <div class="bg-layer">
      <img
        v-for="n in totalImages"
        :key="n"
        :src="getImageUrl(n)"
        :class="{ active: activeStep === n || (!hasSteps && n === start) }"
        alt="background"
      />
    </div>
    <!-- Foreground -->
    <div class="content-layer" :class="`align-${align}`">
      <slot :stepIndex="currentStep - start + 1" :steps="end - start + 1" />
    </div>
    <!-- Mobile only: tap hint, only when there are steps to cycle through -->
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

const totalImages = props.totalImages ?? 18;
const sectionRef = ref<HTMLElement | null>(null);
const currentStep = ref(props.start);
const isActive = ref(false);
let locked = false;

const hasSteps = computed(() => props.start !== props.end);
const activeStep = computed(() => props.overrideStep ?? currentStep.value);

const getImageUrl = (n: number) =>
  new URL(`../assets/images/${n}.png`, import.meta.url).href;

const step = (dir: 1 | -1) => {
  if (!isActive.value || !hasSteps.value) return;
  if (dir > 0 && currentStep.value === props.end) return;
  if (dir < 0 && currentStep.value === props.start) return;
  if (locked) return;
  locked = true;
  currentStep.value += dir;
  setTimeout(() => (locked = false), 1000);
};

// ── Wheel
const handleWheel = (e: WheelEvent) => {
  if (!isActive.value || !hasSteps.value) return;
  if (e.deltaY > 0 && currentStep.value === props.end) return;
  if (e.deltaY < 0 && currentStep.value === props.start) return;
  e.preventDefault();
  step(e.deltaY > 0 ? 1 : -1);
};

// ── Touch swipe
let touchStartY = 0;
let touchDeltaY = 0;
let isStepping = false;

const handleTouchStart = (e: TouchEvent) => {
  if (!isActive.value || !hasSteps.value) return;
  touchStartY = e.touches[0]?.clientY ?? 0;
  touchDeltaY = 0;
  isStepping = false;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isActive.value || !hasSteps.value) return;
  touchDeltaY = touchStartY - (e.touches[0]?.clientY ?? 0);
  if (!isStepping && Math.abs(touchDeltaY) > 15) {
    const dir = touchDeltaY > 0 ? 1 : -1;
    const canStep =
      (dir > 0 && currentStep.value < props.end) ||
      (dir < 0 && currentStep.value > props.start);
    if (canStep) isStepping = true;
  }
  if (isStepping && e.cancelable) e.preventDefault();
};

const handleTouchEnd = () => {
  if (!isStepping || Math.abs(touchDeltaY) < 30) return;
  step(touchDeltaY > 0 ? 1 : -1);
  isStepping = false;
};

// ── Tap (mobile, no swipe)
const handleTap = (e: MouseEvent) => {
  if (!hasSteps.value) return;
  if (isStepping) return;
  if ((e.target as HTMLElement).closest("a, button")) return;
  if (!window.matchMedia("(hover: none)").matches) return;
  step(1);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      isActive.value = entry.isIntersecting;
    },
    { threshold: 0.95 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
  const container = document.getElementById("main-scroll-container");
  container?.addEventListener("wheel", handleWheel, { passive: false });
  sectionRef.value?.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  sectionRef.value?.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });
  sectionRef.value?.addEventListener("touchend", handleTouchEnd, {
    passive: true,
  });
  sectionRef.value?.addEventListener("click", handleTap);
  onUnmounted(() => {
    observer.disconnect();
    container?.removeEventListener("wheel", handleWheel);
    sectionRef.value?.removeEventListener("touchstart", handleTouchStart);
    sectionRef.value?.removeEventListener("touchmove", handleTouchMove);
    sectionRef.value?.removeEventListener("touchend", handleTouchEnd);
    sectionRef.value?.removeEventListener("click", handleTap);
  });
});
</script>

<style scoped>
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
.content-layer.align-left {
  left: 0;
  right: auto;
}
.content-layer.align-center {
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 2rem;
}
.content-layer.align-right {
  left: auto;
  right: 0;
}
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
::v-deep(.text-card) h1 {
  font-size: 2.5rem;
}
::v-deep(.text-card) p {
  margin: 1rem 0;
  font-size: 1.2rem;
}

/* Tap hint — hidden on desktop, shown on touch devices */
.tap-hint {
  display: none;
  position: absolute;
  bottom: 8rem; /* above the nav bar */
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  pointer-events: none;
  letter-spacing: 0.05em;
  z-index: 20;
  white-space: nowrap;
}

@media (max-width: 999px) {
  .content-layer {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow-y: auto;
  }
  ::v-deep(.text-card) h1 {
    font-size: 1.8rem;
  }
  ::v-deep(.text-card) p {
    font-size: 1rem;
  }
}

@media (hover: none) {
  /* Only show tap hint on actual touch devices */
  .tap-hint {
    display: block;
  }
}
</style>
