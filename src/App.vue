<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

import { useFirestore } from 'vuefire'
const db = useFirestore()

const users = useCollection(collection(db, 'users'))

console.log(users)
</script>

<template>
  <body>
  <div class="container">
    <div class="left-section">
      <div class="inner-div light-blue"></div>
      <div class="inner-div blue"></div>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
    <div class="right-section"></div>
  </div>
  </body>
</template>

<style scoped>

</style>
