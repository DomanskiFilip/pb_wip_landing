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
    <div
      class="content-layer"
      :class="`align-${align}`"
    >
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
  align?: "left" | "center" | "right"; // Added align prop
}>();

const totalImages = props.totalImages ?? 7;

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
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    isActive.value = entry.isIntersecting;
  }, { threshold: 0.95 });

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
  align-items: center;
  justify-content: center; /* Centers content *within* the layer */
}

/* Alignment classes */
.content-layer.align-left {
  left: 0;
  right: auto; /* Ensures it's pushed to the left */
}

.content-layer.align-center {
  left: 0;
  right: 0;
  margin: 0 auto; /* Centers the block element */
}

.content-layer.align-right {
  left: auto;
  right: 0; /* Pushes it to the right */
}


/* SHADOW CARD FOR SLOT CONTENT */
::v-deep(.text-card) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem 3rem;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  max-width: 700px;
  color: white;
}

::v-deep(.text-card) h1 {
  margin: 0.5rem 0;
  font-size: 2.5rem;
}

::v-deep(.text-card) p {
  margin: 1.5rem 0;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .content-layer {
    left: 0;
    right: 0;
    width: 100%;
    /* Center alignment for smaller screens */
    margin: 0 auto;
  }

  /* Ensure alignment classes still work on smaller screens */
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
