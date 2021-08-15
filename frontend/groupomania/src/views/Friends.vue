<template >
    <div class="md:flex relative min-h-screen h-screen">
        <Nav />
        <div class="w-full h-full md:overflow-y-scroll">
            <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
                <h1 class="text-xl font-bold">Amis</h1>
                <i class="far fa-star text-xl text-red-300"></i>
            </div>
            <div class="container">
                <div class="px-5 py-3 flex flex-wrap">
                    <div v-for="(user, id) in users" :key="id" class="flex flex-col">
                        <router-link :to="`/friend/${user.id}`">
                        <button name="friend" class="w-full flex hover:bg-lighter m-4 p-3 border-lighter">
                            <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" alt="image-profil" class="h-16 w-16 rounded-full flex-none"/>
                            <img v-else :src="user.profilePhoto" alt="image-profil" class="h-12 w-12 rounded-full flex-none"/>
                            <div class="lg:block ml-4 mt-3">
                                <p class="text-sm font-bold leading-tight"> {{ user.lastname}} {{user.firstname}} </p>
                                <p v-if="user.lastname === null" class="text-sm font-bold leading-tight"> {{ user.username }} </p>
                                <p v-else class="text-xs font-bold leading-tight"> @ {{ user.username }} </p>
                                
                            </div>
                            <button v-if="admin.isAdmin == 1" @click="deleteUser(user)" name="delete" class="ml-auto mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import { mapState } from 'vuex';

export default {
    name: "Friends",
    components: {
        Nav,
        
    },
    created(){
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            admin: 'userInfos',
            users() {
                return this.$store.state.users
            },
        }),
        
    },
    methods: {
        deleteUser: function (user) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? ')
            if (response) {
                this.$store.dispatch('deleteUser', user)
                this.$router.go('/home');
                return;
            }
        },
    }
}
</script>