<script>
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()

</script>

<script setup>
import "@/assets/home.css";
// import {useFirebaseAuth} from "vuefire";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import router from "../router";

const auth = useFirebaseAuth() // only exists on client side



const signinPopup = async () => {
  /*signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed sign', reason)
  })*/

  this.$router.push('/gatcha/QhMUFADip3rp81ygFdyP')
}

const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then(() => {
        router.replace('/about');
      })
      .catch((reason) => {
        console.error('Failed to sign in', reason);
      });
};

("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
</script>

<template>
  <ErrorBox v-if="error" :error="error" />
<h1>Welkom op Swipecord</h1>
<div class="box_home">
  <div class="links">
    <p>Log in met Google</p>
    <button @click="login()" type="button" class="login-with-google-btn" >
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
    <a href="/aanmelden">Nog geen account? Maak er een aan!</a>
  </div>
</div>

</template>

<style scoped>

</style>