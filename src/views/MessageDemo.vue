<script setup lang="ts">
import {useFirestore} from 'vuefire'
import {collection, getDocs} from "firebase/firestore";
import {ref} from "vue";


const LoginUser = 'bh47QisqhyYcIRciLhlh9GE6jzx1'
const chatId = '7onqwJmH73U3ujPdurjb'

const otherUserId = 'q3KfIuCiqiehAs8CRiH8fQsmVaC2'

const db = useFirestore()

const getMessages = async () => {
  const messagesCollectionRef = collection(db, 'chats', chatId , 'messages');
  const messagesSnapshot = await getDocs(messagesCollectionRef);
  return messagesSnapshot.docs.map(doc => doc.data());
}

let messages = ref( await getMessages() )

console.log(messages);
</script>

<template>
  <h1>HELP!!!!!</h1>
</template>
