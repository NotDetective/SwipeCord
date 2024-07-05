<script setup>
import { ref } from 'vue';
import "@/assets/home.css";
import router from "@/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const email = ref('');
const password = ref('');
const username = ref('');
const error = ref(null);

const registerWithEmail = async () => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = result.user;
    await initializeUserData(user.uid);
    router.replace('/gatcha/QhMUFADip3rp81ygFdyP');
  } catch (err) {
    console.error('Failed to register', err);
    error.value = 'Failed to register. Please try again.';
  }
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
    xpcap: 100,
    username: username.value // Store username in Firestore
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
</script>

<template>
  <h1>Welkom op Swipecord</h1>
  <div class="box_home">
    <div class="aanmelden">
      <p>Aanmelden</p>
      <form @submit.prevent="registerWithEmail">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" placeholder="Enter your Username" required data-cy="username-input">

        <label for="email">Emailadres:</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your Emailadres" required data-cy="email-input">

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your Password" required data-cy="password-input">

        <label for="passwordRepeat">Herhaal Password:</label>
        <input type="password" id="passwordRepeat" placeholder="Enter your Password" required data-cy="password-repeat-input">

        <div class="wrap">
          <button type="submit" data-cy="submit-button">Submit</button>
        </div>
      </form>
      <div v-if="error" data-cy="error-message">{{ error }}</div>
      <a href="/" data-cy="login-link">Inloggen</a>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

body {
  position: absolute;
  background: rgb(253, 187, 45);
  background: -moz-linear-gradient(0deg, rgba(253, 187, 45, 1) 0%, rgba(34, 193, 195, 1) 68%);
  background: -webkit-linear-gradient(0deg, rgba(253, 187, 45, 1) 0%, rgba(34, 193, 195, 1) 68%);
  background: linear-gradient(0deg, rgba(253, 187, 45, 1) 0%, rgba(34, 193, 195, 1) 68%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fdbb2d", endColorstr="#22c1c3", GradientType=1);
  height: 100vh;
  width: 100%;
  margin-left: -15%;

  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

h1 {
  font-size: 3em;
  color: black;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.box_home {
  display: flex;
  justify-content: space-around;
  height: 60vh;
  width: 75vw;
  background-color: rgba(255, 255, 255, 60%);
  border-radius: 50px;
}

.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.aanmelden {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
}

.aanmelden p {
  font-size: 1.5em;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  margin-bottom: 20px;
}

form {
  width: 20vw;
}

.aanmelden form {
  width: 30vw;
}

.rechts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
}

.rechts p {
  font-size: 1.5em;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  margin-bottom: 20px;
}

.links p {
  font-size: 1.5em;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  margin-bottom: 20px;
}

/*Button for Google login*/
.login-with-google-btn {
  transition: background-color .3s, box-shadow .3s;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}

.login-with-google-btn:hover {
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
}

.login-with-google-btn:active {
  background-color: #eeeeee;
}

.login-with-google-btn:focus {
  outline: none;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25), 0 0 0 3px #c8dafc;
}

.login-with-google-btn:disabled {
  filter: grayscale(100%);
  background-color: #ebebeb;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  cursor: not-allowed;
}

/* Login form styles */
label {
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: left;
  color: #555;
  font-weight: bold;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: none;
  color: white;
  cursor: pointer;
  background-color: #4caf95;
  width: 100%;
  font-size: 16px;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: underline;
  color: black;
}
</style>
