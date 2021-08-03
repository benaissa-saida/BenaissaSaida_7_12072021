<template>
    <div class="md:block hidden w-1/3 h-full border-l border-red-50 py-2 px-6 overflow-y-scroll relative">
        <input v-model="search" class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search" />
        <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
        <div class="w-full rounded-lg bg-lightest my-4">
            <div class=" p-3">
                <p class="text-lg font-bold">Mes Amis</p>
            </div>
            <div v-for="(user, id) in filteredUser" :key="id">
                <button class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
                    <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                    <img v-else src="{{ user.profilePhoto }}" class="h-12 w-12 rounded-full flex-none"/>
                    <div class=" lg:block ml-4">
                        <p v-if="user.lastname === null" class="text-sm font-bold leading-tight"> {{ user.username }} </p>
                        <p v-else class="text-sm font-bold leading-tight"> {{ user.lastname}} {{user.firstname}} </p>
                        
                    </div>
                    <button v-if="admin.id == 1" @click="deleteUser(user)" class="ml-auto w-8 h-8 rounded-full hover:bg-red-600">
                         <i class="fas fa-trash-alt text-dark"></i>
                    </button>
                </button>
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
                this.$router.go('/');
                return;
            }
        },
    }   
}
</script>