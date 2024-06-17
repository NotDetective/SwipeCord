  <script setup lang="ts">
  import { ref } from 'vue';
  import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
  import { useFirestore } from 'vuefire'

  const db = useFirestore()

  const userId = 'ID:3';
  const bannerId = 'QhMUFADip3rp81ygFdyP';
  var pulledItem;

  const pullItem = async () => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      let userData = userDoc.data();

      if (!userData) {
        throw new Error('User data not found for user ID: ' + userId);
      }

      const bannerDocRef = doc(db, 'banner', bannerId);
      const bannerDoc = await getDoc(bannerDocRef);
      let bannerData = bannerDoc.data();

      if (!bannerData) {
        throw new Error('Banner data not found for banner ID: ' + bannerId);
      }

      const userPullsDocRef = doc(db, 'pulls', bannerId, /*hardcoded for now*/ 'special', userId);
      const UserPullsDoc = await getDoc(userPullsDocRef);
      let UserPullData = UserPullsDoc.data();

      let pity = userPullsDocRef.pity || 0;
      console.log("making: "+pity)


      const HardPity = 0.97;
      //chance in %
      const threeStarChance = 73;
      const fourStarChance = 23;
      const fiveStarChance = 2.5;

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
      console.log("after check: "+pity)


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
        if (bannerData.type === 'Special') {
          const fiftyFifty = Math.floor(Math.random() * 2) + 1;
          if (fiftyFifty === 2) {
            bannerData = (await getDoc(doc(db, 'banners', 'Normal'))).data();
          }
        }
        randomNumberItem = 1;
      } else {
        pulledItemType = '6-star item';
        randomNumberItem = 1;
      }
      console.log("making: "+pity)
      console.log(pulledItemType);
      console.log(bannerData[pulledItemType][randomNumberItem - 1]);
      pulledItem = bannerData[pulledItemType][randomNumberItem - 1];

      console.log(...UserPullData.History, String(pulledItem))
      console.log(UserPullData.pity)
      await updateDoc(userPullsDocRef, {
        //'History': [...UserPullData.History, String(pulledItem)],
        'pity': pity
      });

    } catch (error) {
      console.error('Error pulling item:', error);
    }
  };
  </script>

  <template>
    <main>
      <div>
        <h1>Gacha Pull</h1>
        <button @click="pullItem">Pull from Gacha</button>
        <p v-if="pulledItem">Pulled Item: {{ pulledItem }}  </p>
      </div>
    </main>
  </template>

  <style scoped>
  </style>
