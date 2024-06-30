<script setup lang="ts">
import {useFirestore} from 'vuefire'
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import {ref, onMounted} from "vue";
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
  const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
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

  const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
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

// this fuction is fucked. dont ask how dont ask why just know it fucked
// it workes so it good
function timestampToDate(timestamp) {
  console.log(timestamp);

  let nanoseconds = timestamp.nanoseconds;
  let seconds = timestamp.seconds;

  // Convert nanoseconds to milliseconds
  const millisecondsFromNanoseconds = nanoseconds / 1e6;

  // Combine seconds and milliseconds
  const totalMilliseconds = (seconds * 1000) + millisecondsFromNanoseconds;

  // Create a Date object
  const date = new Date(totalMilliseconds);

  // Format the date as mm:hh dd:MM:yy
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

  return `${hours}:${minutes} ${month}:${day}`;
}

onMounted(() => {
  listenToMessages();

  var messageBody = document.querySelector('#messageBody');
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
});
</script>

<template>
  <Suspense>
    <template #default>
      <section
        class="chat-container"
        id="messageBody"
      >
        <div
            class="message-container"
            v-if="messages.length > 0">
          <div
              :class="displayName === message.displayName ? 'bubble right' : 'bubble left'"
              v-for="(message, index) in messages" :key="message.id">
            <!-- if(displayName === message.displayName) place item right  -->
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
  <div
      class="send-message-container"
  >
    <input v-model="newMessage" placeholder="Type your message here..."
           @keyup.enter="addMessage"
    />
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
  --r: 1em;  /* the radius */
  --t: 1.5em; /* the size of the tail */

  max-width: 300px;
  padding: 1em;
  border-inline: var(--t) solid #0000;
  border-radius: calc(var(--r) + var(--t))/var(--r);
  mask:
      radial-gradient(100% 100% at var(--_p) 0,#0000 99%,#000 102%)
      var(--_p) 100%/var(--t) var(--t) no-repeat,
      linear-gradient(#000 0 0) padding-box;
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
  float:left;
  clear:both;
}

input {
  margin:15px 0;
  padding:15px 10px;
  width:100%;
  outline:none;
  border:1px solid #bbb;
  border-radius:20px;
  display:inline-block;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
  -webkit-transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -ms-transition:0.2s ease all;
  -o-transition:0.2s ease all;
  transition:0.2s ease all;
}

.send-button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
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
.send-button:hover{
  transform: scale(1.04);
  background-color: #21e065;
}

</style>
