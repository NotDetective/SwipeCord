<script setup>
import "@/assets/home.css";
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import router from "../router";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();



const registerWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await initializeUserData(user.uid);
    router.replace('/gatcha/QhMUFADip3rp81ygFdyP');
  } catch (error) {
    console.error('Failed to register', error);
  }
};

const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    router.replace('/gatcha/QhMUFADip3rp81ygFdyP');
  } catch (error) {
    console.error('Failed to login', error);
  }
};


const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await initializeUserData(user.uid);
        router.replace('/gatcha/QhMUFADip3rp81ygFdyP');
      })
      .catch((reason) => {
        console.error('Failed to sign in', reason);
      });
};

const initializeUserData = async (userId) => {
  const pullsRef = doc(db, `pulls/QhMUFADip3rp81ygFdyP/special/${userId}`);
  const userRef = doc(db, `users/${userId}`);
  const inventoryRef = doc(db, `users/${userId}/inventory/${userId}`);

  const userData = {
    DailyStreak: 0,
    Coins: 0,
    hasDaily: false,
    rank: 1,
    xp: 0,
    xpcap: 100
  };

  const pullsData = {
    pity: 0,
    History: []
  };

  const inventoryData = {
    Items: []
  };

  await setDoc(pullsRef, pullsData);
  await setDoc(userRef, userData);
  await setDoc(inventoryRef, inventoryData);
};

const deleteUserData = async (userId) => {
  const pullsRef = doc(db, `pulls/QhMUFADip3rp81ygFdyP/special/${userId}`);
  const userRef = doc(db, `users/${userId}`);
  const inventoryRef = doc(db, `users/${userId}/inventory/${userId}`);

  await deleteDoc(pullsRef);
  await deleteDoc(userRef);
  await deleteDoc(inventoryRef);
  deleteUserAccount();
};

const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    await deleteUserData(user.uid);
    await user.delete();
  }
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
    <a href="/gatcha/QhMUFADip3rp81ygFdyP">gatcha //placeholder</a>
  </div>
</div>

</template>

<style scoped>

</style>