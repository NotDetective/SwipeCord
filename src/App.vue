<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

import { useFirestore } from 'vuefire'
const db = useFirestore()

const users = useCollection(collection(db, 'users'))

console.log(users)
</script>

<template>
  <div class="container">
    <div class="left-section">
      <div class="inner-div blue">
        <a href="/">Home :3</a>
        <a href="/gatcha/QhMUFADip3rp81ygFdyP">gatcha</a>
        <a href="/MessageDemo">chat</a>
      </div>
      <div class="inner-div light-blue"></div>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
    <div class="right-section"></div>
  </div>
</template>

<style scoped>
  .container{
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .left-section{
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .inner-div{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .light-blue{
    width: 70%;
    background-color: #92D0F8;
  }
  .blue{
    width: 30%;
    background-color: #5CAAE7;
  }
  .main-content{
    height: 100%;
    width: 70%;
  }

  .right-section{
    height: 100%;
    width: 17.5%;
    background-color: #757575;
    border-left: 1px solid #000000;
  }

</style>
