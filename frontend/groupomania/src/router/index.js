import { createWebHistory, createRouter } from "vue-router";
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Poste from '@/components/Poste.vue';
import Profile from '@/views/Profile.vue';



const routes = [
    { 
        name: 'login',
        path: '/', 
        component: Login,
        meta: {
            requiresVisitor: true,
        },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'poste',
        path: '/poste/:id', 
        component: Poste, 
        props:true,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'profile',
        path: '/profile', 
        component: Profile, 
        props:true,
        meta: {
            requiresAuth: true,
        },
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

  
  
export default router;