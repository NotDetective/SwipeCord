<script setup lang="ts">
import "@/assets/home.css";

("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
</script>

<template>
<h1>Welkom op Swipecord</h1>
<div class="box_home">
  <div class="links">
    <p>Log in met Google</p>
    <button type="button" class="login-with-google-btn" >
      Sign in with Google
    </button>
  </div>

  <div class="rechts">
    <p>Log in</p>
    <form action="">
      <label for="first">
        Username:
      </label>
      <input type="text"
             id="first"
             name="first"
             placeholder="Enter your Username" required>

      <label for="password">
        Password:
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
  </div>
</div>

</template>

<style scoped>

</style>