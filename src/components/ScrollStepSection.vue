<template>
  <section ref="sectionRef" class="scroll-wrapper snap-point">
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
    <div class="content-layer" :class="`align-${align}`">
      <slot :stepIndex="currentStep - start + 1" :steps="end - start + 1" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  start: number;
  end: number;
  totalImages?: number;
  align?: "left" | "center" | "right";
}>();

const totalImages = props.totalImages ?? 18;

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
  else if (isUp) currentStep.value--;

  setTimeout(() => (locked = false), 120);
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
  width: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: right;
  margin-top: 5rem;
}

/* Alignment classes */
.content-layer.align-left {
  left: 0;
  right: auto;
  margin-left: 2rem;
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
  margin-right: 2rem;
}

/* SHADOW CARD FOR SLOT CONTENT */
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
  max-width: 700px;
  color: white;
}

::v-deep(.text-card) h1 {
  font-size: 2.5rem;
}

::v-deep(.text-card) p {
  margin: 1rem 0;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .content-layer {
    left: 0;
    right: 0;
    width: 100%;
    margin: 0 auto;
  }

  .content-layer.align-left {
    left: 0;
    right: auto;
  }
  .content-layer.align-right {
    left: auto;
    right: 0;
  }

  ::v-deep(.text-card) h1 {
    font-size: 1.8rem;
  }

  ::v-deep(.text-card) p {
    font-size: 1rem;
  }
}
</style>
