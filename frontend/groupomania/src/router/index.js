import { createWebHistory, createRouter } from "vue-router";
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Poste from '@/components/Poste.vue';
import Profile from '@/views/Profile.vue';
import Friends from '@/views/Friends.vue';
import FriendProfile from '@/components/FriendProfile.vue';
import UserProfileDelete from '@/components/UserProfileDelete.vue';
import store from '../store/index'



const routes = [
    { 
        name: 'login',
        path: '/', 
        component: Login,
        meta: {
           title: 'Connexion',
           requiresVisitor: true,
        },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            title: 'Accueil',
            requiresAuth: true,
        },
    },
    { 
        name: 'poste',
        path: '/poste/:id', 
        component: Poste, 
        props:true,
        meta: {
            title: 'Poste',
            requiresAuth: true,
        },
    },
    { 
        name: 'profile',
        path: '/profile', 
        component: Profile, 
        props:true,
        meta: {
            title: 'Profile',
            requiresAuth: true,
        },
    },
    {
        name: 'friends',
        path: '/friends',
        component: Friends,
        meta: {
            title: 'Amis',
            requiresAuth: true,
        },
    },
    { 
        name: 'friendProfile',
        path: '/friend/:id', 
        component: FriendProfile, 
        props:true,
        meta: {
            title: 'Profile amis',
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

router.beforeEach((to, from, next) => {
    if (to.matched.some((routes) => routes.meta.requiresAuth)) {
      if (!store.state.user.token) {
        next({
          name: 'login'
        });
      } else {
        next();
      }
    } else if (to.matched.some((routes) => routes.meta.requiresVisitor)) {
      if ((store.state.user.token)) {
        next({
          name: 'home' || 'poste' || 'profile' || 'friends' || 'friendProfile',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
})
  
  
export default router;