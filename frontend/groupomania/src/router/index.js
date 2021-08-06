import { createWebHistory, createRouter } from "vue-router";
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Poste from '@/components/Poste.vue';
import Profile from '@/views/Profile.vue';
import Friends from '@/views/Friends.vue';
import FriendProfile from '@/components/FriendProfile.vue';
import UserProfileDelete from '@/components/UserProfileDelete.vue';



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
    {
        name: 'friends',
        path: '/friends',
        component: Friends,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'friendProfile',
        path: '/friend/:id', 
        component: FriendProfile, 
        props:true,
        meta: {
            requiresAuth: true,
        },
    },
    { 
        name: 'UserProfileDelete',
        path: '/UserProfileDelete', 
        component: UserProfileDelete, 
        props:true,
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

  
  
export default router;