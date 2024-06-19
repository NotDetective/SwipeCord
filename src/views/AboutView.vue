<script setup>
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  // ...
  console.log(user.displayName)
} else {
  // No user is signed in.
  this.$router.push('/')
}


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{user.displayName}}</p>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
