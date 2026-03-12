<template>
  <div class="text-card" v-if="shouldShowCard">
    <h1>{{ currentTitle }}</h1>
    <p v-html="currentParagraph1"></p>
    <p v-html="currentParagraph2"></p>
  </div>
  <img v-if="stepIndex === 2" src="/src/assets/images/YOU.png" alt="We need you" style="margin: auto; max-width: 100%; height: 500px; padding-left: 15vw;" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  stepIndex: number;
  steps: number;
}>();

const content = [
  {
    title: "What?",
    paragraph1:
      'Project Beacon is a non-profit <span class="bold">community</span>  project (not affiliated with Mojang studios in any way) that aims to create a fully animated feature-length film based on the universe of Minecraft.',
    paragraph2:
      'That\'s right, whether you\'re a writer, a storyboard artist, a 3D artist, a voice actor, a musician, an editor or just passionate about the game, <span class="bold">We need <span class="animated-text">YOUR</span> help to make this project a reality!</span> ',
  },
  { title: "", paragraph1: "", paragraph2: "" },
  {
    title: "How would this work?",
    paragraph1:
      'We are currently working on the official voting platform, <span class="bold"> where all decisions will be made through a collective vote, selecting the work preferred by the majority</span>; from the scripts to the animation style to the sound design...etc.',
    paragraph2:
      'The official website is currently in beta testing, this is only a  <span class="bold">temporary site</span>, once it is up, you will be able to officially be part of the project, choose your department and join a team!',
  },
  { title: "", paragraph1: "", paragraph2: "" },
  {
    title: "Great! So when do we start?",
    paragraph1:
      "We will publicly test the system soon. once we know it can work, we will produce a concept trailer with the platform before working on the gigantic movie. For more details check out the blogs page.",
    paragraph2:
      "The goal of this trailer would essentially be to test the workflow, give our team a chance to finally show off their skills and anticipate reactions to the project. Subscribe to our YouTube channel to be notified!",
  },
  { title: "", paragraph1: "", paragraph2: "" },
  { title: "", paragraph1: "", paragraph2: "" },
  { title: "", paragraph1: "", paragraph2: "" },
  { title: "", paragraph1: "", paragraph2: "" },
  { title: "", paragraph1: "", paragraph2: "" },
  {
    title: "What's next for project beacon?",
    paragraph1:
      "The plan is as follows: finish working on the voting website, and as soon as that's done, use it to make a concept trailer, then, depending on how it is received, finally begin preproduction on the movie.",
    paragraph2:
      '<span class="bold">We hope you will join us on this journey!</span>',
  },
];

const shouldShowCard = computed(() => {
  return props.stepIndex === 1 || props.stepIndex === 3 || props.stepIndex === 5 || props.stepIndex === props.steps;
});

const currentTitle = computed(() => content[props.stepIndex - 1]?.title || "");
const currentParagraph1 = computed(
  () => content[props.stepIndex - 1]?.paragraph1 || "",
);
const currentParagraph2 = computed(
  () => content[props.stepIndex - 1]?.paragraph2 || "",
);
</script>

<style scoped>
.text-card {
  width: 500px;
  height: 80vh;
  justify-content: flex-start;
  padding-top: 5vh;
  animation: fadeIn 0.6s ease-in-out;
  margin: auto 5vw auto 10vw;
}

.text-card h1 {
  font-size: 3rem;
}

.text-card p {
  font-size: 1.5rem;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes colorLoop {
  0% {
    --color: hsl(358, 100%, 49%);
  } /* Magenta */
  2.5% {
    --color: hsl(170, 100%, 60%);
  } /* Purple */
  5% {
    --color: hsl(25, 100%, 62%);
  } /* Indigo */
  7.5% {
    --color: hsl(288, 99%, 34%);
  } /* Blue-violet */
  10% {
    --color: hsl(169, 100%, 61%);
  } /* Violet */
  12.5% {
    --color: hsl(137, 100%, 53%);
  } /* Lavender */
  15% {
    --color: hsl(348, 97%, 42%);
  } /* Magenta */
  17.5% {
    --color: hsl(335, 100%, 64%);
  } /* Plum */
  20% {
    --color: hsl(19, 100%, 68%);
  } /* Purple */
  22.5% {
    --color: hsl(194, 100%, 63%);
  } /* Light purple */
  25% {
    --color: hsl(204, 100%, 36%);
  } /* Dark pink */
  27.5% {
    --color: hsl(328, 92%, 46%);
  } /* Magenta-pink */
  30% {
    --color: hsl(177, 100%, 53%);
  } /* Plum */
  32.5% {
    --color: hsl(342, 87%, 64%);
  } /* Deep purple */
  35% {
    --color: hsl(359, 71%, 44%);
  } /* Magenta */
  37.5% {
    --color: hsl(307, 100%, 44%);
  } /* Plum */
  40% {
    --color: hsl(264, 99%, 48%);
  } /* Purple */
  42.5% {
    --color: hsl(190, 100%, 34%);
  } /* Lavender */
  45% {
    --color: hsl(72, 100%, 58%);
  } /* Magenta */
  47.5% {
    --color: hsl(196, 100%, 73%);
  } /* Plum */
  50% {
    --color: hsl(186, 98%, 49%);
  } /* Purple */
  52.5% {
    --color: hsl(284, 100%, 58%);
  } /* Magenta-pink */
  55% {
    --color: hsl(76, 100%, 74%);
  } /* Plum */
  57.5% {
    --color: hsl(135, 96%, 49%);
  } /* Purple */
  60% {
    --color: hsl(289, 95%, 44%);
  } /* Magenta-pink */
  62.5% {
    --color: hsl(79, 100%, 35%);
  } /* Plum */
  65% {
    --color: hsl(139, 89%, 59%);
  } /* Purple */
  67.5% {
    --color: hsl(240, 100%, 52%);
  } /* Magenta-pink */
  70% {
    --color: hsl(114, 95%, 38%);
  } /* Plum */
  72.5% {
    --color: hsl(165, 95%, 68%);
  } /* Purple */
  75% {
    --color: hsl(71, 96%, 40%);
  } /* Magenta-pink */
  77.5% {
    --color: hsl(321, 97%, 46%);
  } /* Plum */
  80% {
    --color: hsl(105, 98%, 53%);
  } /* Purple */
  82.5% {
    --color: hsl(82, 94%, 51%);
  } /* Magenta-pink */
  85% {
    --color: hsl(346, 90%, 47%);
  } /* Plum */
  87.5% {
    --color: hsl(146, 92%, 39%);
  } /* Purple */
  90% {
    --color: hsl(333, 88%, 57%);
  } /* Magenta-pink */
  92.5% {
    --color: hsl(182, 87%, 44%);
  } /* Plum */
  95% {
    --color: hsl(305, 86%, 45%);
  } /* Purple */
  100% {
    --color: hsl(261, 93%, 58%);
  } /* Magenta-pink */
}

::v-deep(.animated-text) {
  animation: colorLoop 10s infinite ease-in-out;
  color: var(--color);
}

::v-deep(.bold) {
  font-weight: bold;
}
</style>
