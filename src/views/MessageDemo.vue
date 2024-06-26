<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";

const LoginUser = 'bh47QisqhyYcIRciLhlh9GE6jzx1'
const chatId = '7onqwJmH73U3ujPdurjb'
const otherUserId = 'q3KfIuCiqiehAs8CRiH8fQsmVaC2'

const db = useFirestore()

const messages = ref([])
const newMessage = ref("")
const editingMessageId = ref(null)
const editingMessageText = ref("")

const listenToMessages = () => {
  const messagesCollectionRef = collection(db, 'chats', chatId , 'messages');
  const q = query(messagesCollectionRef, orderBy('createdAt'));
  onSnapshot(q, (snapshot) => {
    messages.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
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
    userId: LoginUser
  });
  newMessage.value = "";
}

const deleteMessage = async (id) => {
  const messageDocRef = doc(db, 'chats', chatId, 'messages', id);
  await deleteDoc(messageDocRef);
}

const startEditing = (id, text) => {
  editingMessageId.value = id;
  editingMessageText.value = text;
}

const updateMessage = async () => {
  if (editingMessageText.value.trim() === "") {
    return;
  }

  const messageDocRef = doc(db, 'chats', chatId, 'messages', editingMessageId.value);
  await updateDoc(messageDocRef, {
    text: editingMessageText.value,
    updatedAt: serverTimestamp()
  });

  editingMessageId.value = null;
  editingMessageText.value = "";
}

onMounted(() => {
  listenToMessages();
});
</script>

<template>
  <Suspense>
    <template #default>
      <div v-if="messages.length > 0">
        <div v-for="(message, index) in messages" :key="message.id">
          <span v-if="editingMessageId !== message.id">{{ message.text }}</span>
          <input v-else v-model="editingMessageText"
            @keyup.enter="updateMessage"
          />
          <button v-if="editingMessageId === message.id" @click="updateMessage">Save</button>
          <button v-if="editingMessageId !== message.id" @click="startEditing(message.id, message.text)">Edit</button>
          <button @click="deleteMessage(message.id)">Delete</button>
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
    <input v-model="newMessage" placeholder="Type your message here..."
      @keyup.enter="addMessage"
    />
    <button @click="addMessage">Send</button>
    <a href="/">Home :3</a>
  </div>
</template>
