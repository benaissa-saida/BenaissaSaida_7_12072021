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
           title: 'Connexion'
        },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            title: 'Accueil'
        },
    },
    { 
        name: 'poste',
        path: '/poste/:id', 
        component: Poste, 
        props:true,
        meta: {
            title: 'Poste'
        },
    },
    { 
        name: 'profile',
        path: '/profile', 
        component: Profile, 
        props:true,
        meta: {
            title: 'Profile'
        },
    },
    {
        name: 'friends',
        path: '/friends',
        component: Friends,
        meta: {
            title: 'Amis'
        },
    },
    { 
        name: 'friendProfile',
        path: '/friend/:id', 
        component: FriendProfile, 
        props:true,
        meta: {
            title: 'Profile amis'
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

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
})
  
  
export default router;