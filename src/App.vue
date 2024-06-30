<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import router from "@/router";

const auth = getAuth();
const db = useFirestore();
const userId = ref('');
const inventoryVisible = ref(false);
const userInventory = ref([]);

const fetchUserInventory = async (uid: string) => {
  try {
    const userInvDocRef = doc(db, 'users', uid, 'inventory', uid);
    const userInvDoc = await getDoc(userInvDocRef);
    const userInventoryData = userInvDoc.data();
    userInventory.value = userInventoryData?.Items || [];
    console.log('Fetched user inventory:', userInventory.value);
  } catch (error) {
    console.error('Error fetching user inventory:', error);
  }
};

const logout = () => {
  signOut(auth)
      .then(() => {
        console.log("logged out");
        router.push('/');
      })
      .catch((error) => {
        console.error('Failed to log out', error);
      });
};


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
      fetchUserInventory(user.uid);
    } else {
      console.log('No user is signed in.');
    }
  });
});

const toggleInventory = () => {
  inventoryVisible.value = !inventoryVisible.value;
};
</script>

<template>
  <div class="container">
    <div class="left-section">
      <div class="inner-div blue">
        <a href="/">Home :3</a>
        <a href="/gatcha/QhMUFADip3rp81ygFdyP">gatcha</a>
        <a href="/chat/7onqwJmH73U3ujPdurjb">chat</a>
        <button @click="logout">Logout</button>
      </div>
      <div class="inner-div light-blue"></div>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
    <div class="right-section">
      <button @click="toggleInventory">Inventory</button>
      <div v-if="inventoryVisible" class="inventory-sidebar">
        <h2>Inventory</h2>
        <ul>
          <li v-for="item in userInventory" :key="item">{{ item }}</li>
        </ul>
        <button @click="toggleInventory">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.left-section {
  height: 100%;
  width: 15%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.inner-div {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.light-blue {
  width: 70%;
  background-color: #92D0F8;
}

.blue {
  width: 30%;
  background-color: #5CAAE7;
}

.main-content {
  height: 100%;
  width: 70%;
}

.right-section {
  height: 100%;
  width: 17.5%;
  background-color: #757575;
  border-left: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.inventory-sidebar {
  width: 90%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.inventory-sidebar h2 {
  margin-top: 0;
}

.inventory-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.inventory-sidebar li {
  padding: 5px 0;
}

.inventory-sidebar button {
  margin-top: 10px;
}
</style>
