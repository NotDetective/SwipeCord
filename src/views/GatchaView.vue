<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire'
import { useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const route = useRoute()
const db = useFirestore()
const auth = getAuth();
const userId = ref('');

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
    } else {
      //demo code remove when done testing
      userId.value = 'ID:3';
      console.log('No user is signed in.');
    }
  });
});

const bannerId = route.params.id;
let pulledItem;

console.log(userId.value)
const pullItem = async () => {
  if (!userId.value) {
    console.error('User ID is not set.');
    return;
  }

  try {
    const userDocRef = doc(db, 'users', userId.value);
    const userDoc = await getDoc(userDocRef);
    let userData = userDoc.data();

    const userInvDocRef = doc(db, 'users', userId.value, 'inventory', userId.value);
    const userInvDoc = await getDoc(userInvDocRef);
    let userinventoryData = userInvDoc.data();

    if (!userData) {
      throw new Error('User data not found for user ID: ' + userId.value);
    }

    const bannerDocRef = doc(db, 'banner', bannerId);
    const bannerDoc = await getDoc(bannerDocRef);
    let bannerData = bannerDoc.data();

    if (!bannerData) {
      throw new Error('Banner data not found for banner ID: ' + bannerId);
    }

    const userPullsDocRef = doc(db, 'pulls', bannerId, 'special', userId.value);
    const UserPullsDoc = await getDoc(userPullsDocRef);
    let UserPullData = UserPullsDoc.data();

    let pity = UserPullData.pity || 0;

    const HardPity = 0.97;
    const threeStarChance = 74;
    const fourStarChance = 23;
    const fiveStarChance = 1.5;

    const threeStarProbability = threeStarChance / 100;
    const fourStarProbability = fourStarChance / 100;
    const fiveStarProbability = fiveStarChance / 100;

    let randomNumberPull = Math.random();

    if (pity >= 40) {
      randomNumberPull = HardPity;
      pity = 0;
    } else {
      pity++;
    }

    let pulledItemType;
    let randomNumberItem;

    if (randomNumberPull < threeStarProbability) {
      pulledItemType = '3 star';
      randomNumberItem = Math.floor(Math.random() * 10) + 1;
    } else if (randomNumberPull < threeStarProbability + fourStarProbability) {
      pulledItemType = '4 star';
      randomNumberItem = Math.floor(Math.random() * 4) + 1;
    } else if (randomNumberPull < threeStarProbability + fourStarProbability + fiveStarProbability) {
      pulledItemType = '5 star';
      pity = 0;
      if (bannerData.type === 'Special') {
        const fiftyFifty = Math.floor(Math.random() * 2) + 1;
        if (fiftyFifty === 2) {
          bannerData = (await getDoc(doc(db, 'banners', 'Normal'))).data();
        }
      }
      randomNumberItem = 1;
    } else {
      pulledItemType = '6-star item';
      pity = 0;
      randomNumberItem = 1;
    }
    console.log(pulledItemType);
    console.log(bannerData[pulledItemType][randomNumberItem - 1]);
    pulledItem = bannerData[pulledItemType][randomNumberItem - 1];

    console.log(...UserPullData.History, String(pulledItem))
    console.log(UserPullData.pity)
    await updateDoc(userPullsDocRef, {
      'History': [...UserPullData.History, String(pulledItem)],
      'pity': pity
    });

    if (!Array.isArray(userinventoryData.Items)) {
      userinventoryData.Items = [];
    }

    let itemExists = false;
    for (const item of userinventoryData.Items) {
      if (item === pulledItem) {
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      userinventoryData.Items.push(pulledItem);
      await updateDoc(userInvDocRef, {
        Items: userinventoryData.Items
      });
      console.log('Added new item to inventory:', pulledItem);
    } else {
      console.log('Item already exists in inventory:', pulledItem);
    }
    console.log(userinventoryData.Items);

  } catch (error) {
    console.error('Error pulling item:', error);
  }
};

const resetDemo = async () => {
  if (!userId.value) {
    console.error('User ID is not set.');
    return;
  }

  try {
    const userInvDocRef = doc(db, 'users', userId.value, 'inventory', userId.value);
    const userPullsDocRef = doc(db, 'pulls', bannerId, 'special', userId.value);

    await updateDoc(userInvDocRef, {
      Items: []
    });

    await updateDoc(userPullsDocRef, {
      pity: 0,
      History: []
    });

    console.log('Demo reset successfully.');
  } catch (error) {
    console.error('Error resetting demo:', error);
  }
};

</script>

<template>
  <main>
    <div>
      <h1>Gacha Pull</h1>
      <button @click="pullItem">Pull from Gacha</button>
      <button @click="resetDemo">DEMO RESET</button>
    </div>
  </main>
</template>

<style scoped>
</style>
