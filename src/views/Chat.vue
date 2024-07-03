<script setup lang="ts">
import { useFirestore } from 'vuefire';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Ensure useRouter is imported
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "@/router"; // Import router if necessary

const auth = getAuth();
const db = useFirestore();
const route = useRoute();
const userRouter = useRouter(); // Use useRouter

const userId = ref('');
const displayName = ref(null);
const messages = ref([]);
const newMessage = ref("");
const editingMessageId = ref(null);
const editingMessageText = ref("");

const chatId = route.params.id;

const redirectIfNotAuthenticated = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      userRouter.push('/'); // Use userRouter
    } else {
      userId.value = user.uid;
      displayName.value = user.displayName || ' ';
    }
  });
};

const listenToMessages = () => {
  const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesCollectionRef, orderBy('createdAt'));
  onSnapshot(q, (snapshot) => {
    messages.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
};

const updateUserCoins = async () => {
  const userDocRef = doc(db, 'users', userId.value);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const currentCoins = userDoc.data().Coins || 0;
    await updateDoc(userDocRef, { Coins: currentCoins + 1 });
  } else {
    await setDoc(userDocRef, { Coins: 1 });
  }
};

const addMessage = async () => {
  if (newMessage.value.trim() === "") return;

  const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(messagesCollectionRef, {
    text: newMessage.value,
    createdAt: serverTimestamp(),
    userId: userId.value,
    displayName: displayName.value
  });
  newMessage.value = "";
  await updateUserCoins();
};

const deleteMessage = async (id) => {
  const messageDocRef = doc(db, 'chats', chatId, 'messages', id);
  await deleteDoc(messageDocRef);
};

const startEditing = (id, text) => {
  editingMessageId.value = id;
  editingMessageText.value = text;
};

const updateMessage = async () => {
  if (editingMessageText.value.trim() === "") return;

  const messageDocRef = doc(db, 'chats', chatId, 'messages', editingMessageId.value);
  await updateDoc(messageDocRef, {
    text: editingMessageText.value,
    updatedAt: serverTimestamp()
  });

  editingMessageId.value = null;
  editingMessageText.value = "";
};

function timestampToDate(timestamp) {
  let nanoseconds = timestamp.nanoseconds;
  let seconds = timestamp.seconds;

  const millisecondsFromNanoseconds = nanoseconds / 1e6;
  const totalMilliseconds = (seconds * 1000) + millisecondsFromNanoseconds;

  const date = new Date(totalMilliseconds);

  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${hours}:${minutes} ${month}:${day}`;
}

onMounted(() => {
  redirectIfNotAuthenticated();
  listenToMessages();
});
</script>

<template>
  <Suspense>
    <template #default>
      <section class="chat-container" id="messageBody">
        <div class="message-container" v-if="messages.length > 0">
          <div :class="displayName === message.displayName ? 'bubble right' : 'bubble left'"
               v-for="(message, index) in messages" :key="message.id">
            <div class="chat-message">
              <div v-if="editingMessageId === message.id">
                <input v-model="editingMessageText" @keyup.enter="updateMessage" />
                <button @click="updateMessage">Save</button>
              </div>
              <div v-else>
                <div>{{ message.displayName }}</div>
                <div>{{ message.text }}</div>
                <div>{{ timestampToDate(message.createdAt) }}</div>
                <div v-if="userId === message.userId">
                  <button @click="startEditing(message.id, message.text)">Edit</button>
                  <button @click="deleteMessage(message.id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          No messages yet. Be the first to send a message!
        </div>
      </section>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <div class="send-message-container">
    <input v-model="newMessage" placeholder="Type your message here..." @keyup.enter="addMessage" />
    <button class="send-button" @click="addMessage">Send</button>
  </div>
</template>

<style scoped>
.send-message-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.chat-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.message-container {
  margin-top: 40px;
  width: 60%;
  display: grid;
  gap: 20px;
  font-family: system-ui, sans-serif;
  font-size: 20px;
  overflow-y: scroll;
  height: 80vh;
}

.bubble {
  --r: 1em;
  --t: 1.5em;

  max-width: 300px;
  padding: 1em;
  border-inline: var(--t) solid #0000;
  border-radius: calc(var(--r) + var(--t))/var(--r);
  mask: radial-gradient(100% 100% at var(--_p) 0,#0000 99%,#000 102%) var(--_p) 100%/var(--t) var(--t) no-repeat, linear-gradient(#000 0 0) padding-box;
  background: #FFA5B6 border-box;
  color: #fff;
}

.left {
  --_p: 0;
  border-bottom-left-radius: 0 0;
  place-self: start;
}

.right {
  --_p: 100%;
  border-bottom-right-radius: 0 0;
  place-self: end;
}

input {
  margin: 15px 0;
  padding: 15px 10px;
  width: 100%;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 20px;
  display: inline-block;
  box-sizing: border-box;
  transition: 0.2s ease all;
}

.send-button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition: 0.3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 17px 48px;
  color: #fff;
  background-color: #1ED760;
  height: 48px;
}

.send-button:hover {
  transform: scale(1.04);
  background-color: #21e065;
}
</style>
