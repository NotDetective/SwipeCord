import './assets/main.css'

import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import router from './router'


import { initializeApp } from 'firebase/app'
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

console.log(import.meta.env.VITE_FIREBASE_API_KEY)

export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const app = createApp(App)
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);


app.use(router)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
    ],
})


app.mount('#app')
