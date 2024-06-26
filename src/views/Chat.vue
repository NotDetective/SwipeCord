<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import {useRoute} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import router from "@/router";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in.');
  } else {
    console.log('No user is signed in.');
    router.push('/');
  }
});

let userId = ref('');
let displayName = ref(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid;
    displayName.value = user.displayName ? user.displayName : ' ';
    console.log(user.displayName);

  } else {
    console.log('No user is signed in.');
  }
});

const chatId = useRoute().params.id

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
    userId: userId.value,
    displayName: displayName.value
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
          <!-- if(displayName === message.displayName) place item right  -->
          <span v-if="editingMessageId !== message.id">{{ message.displayName }}</span>
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
  </div>
</template>