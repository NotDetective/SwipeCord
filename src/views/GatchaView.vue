<script setup lang="ts">
import { useFirestore } from 'vuefire'
const db = useFirestore()

const pull = () => {
  // number are in %
  const HardPity = 0.97;
  const threeStarChance = 73;
  const fourStarChance = 23;
  const fiveStarChance = 2.5;
  //not used just so you know
  const sixStarChance = 0.5;

  const threeStarProbability = threeStarChance / 100;
  const fourStarProbability = fourStarChance / 100;
  const fiveStarProbability = fiveStarChance / 100;

  const randomNumberPull = Math.random();
  let pulledItem;

  if (randomNumberPull < threeStarProbability) {
    pulledItem = "3-star item";
  } else if (randomNumberPull < threeStarProbability + fourStarProbability) {
    pulledItem = "4-star item";
  } else if (randomNumberPull < threeStarProbability + fourStarProbability + fiveStarProbability) {
    pulledItem = "5-star item";
  } else {
    pulledItem = "6-star global pull";
  }
  console.log("Pulled item:", pulledItem);
}

</script>

<template>
  <main>
    <div>
      <h1>Gacha Pull</h1>
      <button @click="pull">Pull from Gacha</button>
    </div>
  </main>
</template>

<style scoped>

</style>