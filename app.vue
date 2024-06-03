<template>
  <body>
    <div class="layout">
      <div class="sidebar">
        <nav class="navbar">
          <NuxtLink to="/">Home</NuxtLink>
          <br>
          <NuxtLink to="/login">Log In</NuxtLink>
        </nav>
        <div class="content-bar">
          <slot/>
        </div>
      </div>

      <!-- Main content -->
      <main class="main-content">
        <NuxtPage />
      </main>

      <div class="placeholder">
      <slot/>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import '~/assets/style/index.css';
</style>
