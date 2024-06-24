<script setup lang="ts">
import "@/assets/home.css";

("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
</script>

<template>
<h1>Welkom op Swipecord</h1>
<div class="box_home">
<div class="aanmelden">
    <p>Aanmelden</p>
    <form action="">
      <label for="first">
        Username:
      </label>
      <input type="text"
             id="first"
             name="first"
             placeholder="Enter your Username" required>

      <label for="email">
        Emailadres:
      </label>
      <input type="email"
             id="email"
             name="email"
             placeholder="Enter your Emailadres" required>

      <label for="password">
        Password:
      </label>
      <input type="password"
             id="password"
             name="password"
             placeholder="Enter your Password" required>
      <label for="password">
        Herhaal Password:
      </label>
      <input type="password"
             id="password"
             name="password"
             placeholder="Enter your Password" required>

      <div class="wrap">
        <button type="submit"
                onclick="solve()">
          Submit
        </button>
      </div>
    </form>
  <a href="/">Inloggen</a>
  </div>
</div>

</template>

<style scoped>

</style>