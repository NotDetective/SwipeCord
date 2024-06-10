<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

import { useFirestore } from 'vuefire'
const db = useFirestore()

const users = useCollection(collection(db, 'users'))

console.log(users)

</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <nav class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <br>
      </nav>
      <div class="content-bar">
        <slot/>
      </div>
    </div>

    <!-- Main content -->
    <main class="main-content">
      <RouterView />
    </main>

    <div class="placeholder">
      <slot/>
    </div>
  </div>
  <RouterView />
</template>

<style>
</style>