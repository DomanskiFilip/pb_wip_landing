<template>
  <div class="text-card">
    <h1>We Need You</h1>
    <p>
      Whether you’re a writer, a storyboard artist, a 3D artist, a voice actor,
      an editor or just a Minecraft fan.
    </p>
    <p>We need <span>YOUR</span> help to make this project a reality</p>
    <p>Step {{ stepIndex }} / {{ steps }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stepIndex: number;
  steps: number;
}>();
</script>

<style scoped>
@keyframes colorLoop {
 0%   { --color: hsl(358, 100%, 49%); } /* Magenta */
 2.5% { --color: hsl(170, 100%, 60%); } /* Purple */
 5%   { --color: hsl(25, 100%, 62%); }  /* Indigo */
 7.5% { --color: hsl(288, 99%, 34%); } /* Blue-violet */
 10%  { --color: hsl(169, 100%, 61%); } /* Violet */
 12.5%{ --color: hsl(137, 100%, 53%); } /* Lavender */
 15%  { --color: hsl(348, 97%, 42%); } /* Magenta */
 17.5%{ --color: hsl(335, 100%, 64%); } /* Plum */
 20%  { --color: hsl(19, 100%, 68%); }  /* Purple */
 22.5%{ --color: hsl(194, 100%, 63%); } /* Light purple */
 25%  { --color: hsl(204, 100%, 36%); } /* Dark pink */
 27.5%{ --color: hsl(328, 92%, 46%); } /* Magenta-pink */
 30%  { --color: hsl(177, 100%, 53%); } /* Plum */
 32.5%{ --color: hsl(342, 87%, 64%); } /* Deep purple */
 35%  { --color: hsl(359, 71%, 44%); } /* Magenta */
 37.5%{ --color: hsl(307, 100%, 44%); } /* Plum */
 40%  { --color: hsl(264, 99%, 48%); }  /* Purple */
 42.5%{ --color: hsl(190, 100%, 34%); } /* Lavender */
 45%  { --color: hsl(72, 100%, 58%); }   /* Magenta */
 47.5%{ --color: hsl(196, 100%, 73%); } /* Plum */
 50%  { --color: hsl(186, 98%, 49%); }  /* Purple */
 52.5%{ --color: hsl(284, 100%, 58%); } /* Magenta-pink */
 55%  { --color: hsl(76, 100%, 74%); }   /* Plum */
 57.5%{ --color: hsl(135, 96%, 49%); }  /* Purple */
 60%  { --color: hsl(289, 95%, 44%); }  /* Magenta-pink */
 62.5%{ --color: hsl(79, 100%, 35%); }   /* Plum */
 65%  { --color: hsl(139, 89%, 59%); }  /* Purple */
 67.5%{ --color: hsl(240, 100%, 52%); } /* Magenta-pink */
 70%  { --color: hsl(114, 95%, 38%); }  /* Plum */
 72.5%{ --color: hsl(165, 95%, 68%); }  /* Purple */
 75%  { --color: hsl(71, 96%, 40%); }   /* Magenta-pink */
 77.5%{ --color: hsl(321, 97%, 46%); }  /* Plum */
 80%  { --color: hsl(105, 98%, 53%); }  /* Purple */
 82.5%{ --color: hsl(82, 94%, 51%); }   /* Magenta-pink */
 85%  { --color: hsl(346, 90%, 47%); }  /* Plum */
 87.5%{ --color: hsl(146, 92%, 39%); }  /* Purple */
 90%  { --color: hsl(333, 88%, 57%); }  /* Magenta-pink */
 92.5%{ --color: hsl(182, 87%, 44%); }  /* Plum */
 95%  { --color: hsl(305, 86%, 45%); }  /* Purple */
 100% { --color: hsl(261, 93%, 58%); }   /* Magenta-pink */
}

span {
  animation: colorLoop 10s infinite ease-in-out;
  color: var(--color);
}
</style>
