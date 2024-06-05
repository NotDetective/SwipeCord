<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCurrentUser } from 'vuefire'
const user = useCurrentUser()

const auth = getAuth()
let email = ref('micha-elmans@outlook.com')
let password = ref('password')

// display errors if any
const error = ref(null)
function signingRedirect() {
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        auth.currentUser = userCredential.user;
        console.log('Signed in', userCredential.user)
      })
      .catch((reason) => {
        console.error('Failed signingRedirect', reason)
        error.value = reason;
      });
}
</script>

<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="signingRedirect">
      <label for="email">Email</label>
      <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
      >
      <label for="password">Password</label>
      <input
          type="password"
          id="password"
          name="password"
          required
          v-model="password"
      >
      <button type="submit">Log In</button>
    </form>
  </div>

  {{ error }}

  {{ user }}

</template>

<style scoped>
</style>
