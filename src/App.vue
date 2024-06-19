<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

import { useFirestore } from 'vuefire'
const db = useFirestore()

const users = useCollection(collection(db, 'users'))



console.log(users)

</script>

<template>

  <RouterView />
  
</template>
