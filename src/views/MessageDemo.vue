<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { ref, onMounted } from "vue";

const LoginUser = 'bh47QisqhyYcIRciLhlh9GE6jzx1'
const chatId = '7onqwJmH73U3ujPdurjb'
const otherUserId = 'q3KfIuCiqiehAs8CRiH8fQsmVaC2'

const db = useFirestore()

const messages = ref([])
const newMessage = ref("")

const listenToMessages = () => {
  const messagesCollectionRef = collection(db, 'chats', chatId , 'messages');
  onSnapshot(messagesCollectionRef, (snapshot) => {
    messages.value = snapshot.docs.map(doc => doc.data());
  });
}

const addMessage = async () => {
  if (newMessage.value.trim() === "") {
    return;
  }

  const messagesCollectionRef = collection(db, 'chats', chatId , 'messages');
  await addDoc(messagesCollectionRef, {
    text: newMessage.value,
    createdAt: serverTimestamp(),
    userId: LoginUser,
    displayName: 'Bhavik'
  });
  newMessage.value = "";
}

onMounted(() => {
  listenToMessages();
});
</script>

<template>
  <Suspense>
    <template #default>
      <div v-if="messages.length > 0">
        <div v-for="(message, index) in messages" :key="index">
          <div>{{ message.displayName }}</div>
          <div>{{ message.text }}</div>
          <div>{{ message.createdAt }}</div>
        </div>
      </div>
      <div v-else>
        Loading messages...
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <div>
    <input v-model="newMessage" placeholder="Type your message here..." />
    <button @click="addMessage">Send</button>
  </div>
</template>
