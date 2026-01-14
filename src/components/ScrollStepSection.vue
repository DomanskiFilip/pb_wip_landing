<template>
  <section
    ref="sectionRef"
    class="scroll-wrapper snap-point"
  >
    <!-- Background -->
    <div class="bg-layer">
      <img
        v-for="n in totalImages"
        :key="n"
        :src="getImageUrl(n)"
        :class="{ active: currentStep === n || (!hasSteps && n === start) }"
        alt="background"
      />
    </div>


    <!-- Foreground -->
    <div class="content-layer">
      <slot
        :stepIndex="currentStep - start + 1"
        :steps="end - start + 1"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  start: number;
  end: number;
  totalImages?: number;
}>();

const totalImages = props.totalImages ?? 11;

const sectionRef = ref<HTMLElement | null>(null);
const currentStep = ref(props.start);
const isActive = ref(false);
let locked = false;

const hasSteps = computed(() => props.start !== props.end);

const getImageUrl = (n: number) =>
  new URL(`../assets/images/${n}.png`, import.meta.url).href;

const handleWheel = (e: WheelEvent) => {
  if (!isActive.value || !hasSteps.value) return;

  const isDown = e.deltaY > 0;
  const isUp = e.deltaY < 0;

  if (isDown && currentStep.value === props.end) return;
  if (isUp && currentStep.value === props.start) return;

  e.preventDefault();
  if (locked) return;

  locked = true;

  if (isDown) currentStep.value++;
  else currentStep.value--;

  setTimeout(() => (locked = false), 120);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => (isActive.value = entry.isIntersecting),
    { threshold: 0.95 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  const container = document.getElementById("main-scroll-container");
  container?.addEventListener("wheel", handleWheel, { passive: false });

  onUnmounted(() => {
    observer.disconnect();
    container?.removeEventListener("wheel", handleWheel);
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

/* BACKGROUND */
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

/* FOREGROUND */
.content-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
