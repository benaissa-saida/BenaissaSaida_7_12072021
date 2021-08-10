<template>
    <div class="lg:block hidden w-1/3 h-full border-l border-lighter py-2 px-4 overflow-y-scroll relative">
        <input v-model="search" class="pl-12 rounded-full w-full p-2 bg-red-50 text-sm mb-4 focus:outline-none" placeholder="Search" />
        <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
        <div class="w-full rounded-lg bg-red-50">
            <div class=" p-3">
                <p class="text-lg font-bold">Mes Amis</p>
            </div>
            <div v-for="(user, id) in filteredUser" :key="id">
                <router-link :to="`/friend/${user.id}`">
                    <button name="friend" class="w-full flex hover:bg-red-100 p-3 ">
                        <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" alt="image-profil" class="h-10 w-10 rounded-full flex-none"/>
                        <img v-else :src="user.profilePhoto" alt="image-profil" class="h-10 w-10 rounded-full flex-none"/>
                        <div class="lg:block ml-4 mt-3">
                            <p class="text-sm font-bold leading-tight"> {{ user.lastname}} {{user.firstname}} </p>
                            <p v-if="user.lastname === null" class="text-sm font-bold leading-tight"> {{ user.username }} </p>
                            <p v-else class="text-xs font-bold leading-tight"> @ {{ user.username }} </p>
                        </div>
                        <button v-if="admin.id == 1" @click="deleteUser(user)" name="delete" class="ml-auto mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </button>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Amis',
    data: function() {
        return {
            search: "",
            
        }
    },
    computed: {
        ...mapState({
            admin: 'userInfos',
            users() {
                return this.$store.state.users
            },
        }),
        filteredUser() {
            return this.users.filter((user) => {
                if (user.lastname == null ){
                    return user.username.toLowerCase().includes(this.search.toLowerCase());
                } else {
                    return user.lastname.toLowerCase().includes(this.search.toLowerCase()) 
                }
            })
        }
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