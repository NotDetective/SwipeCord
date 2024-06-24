import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GatchaView from '../views/GatchaView.vue';
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gatcha/:id',
      name: 'gatcha',
      component: GatchaView
    },
    {
      path: '/aanmelden',
        name: 'aanmelden',
      component: () => import('../views/Aanmeldform.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
        path: '/MessageDemo',
        name: 'MessageDemo',
        component: () => import('../views/MessageDemo.vue')
    },
  ]
})




export default router
