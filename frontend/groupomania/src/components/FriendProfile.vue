<template>
    <div class="md:flex relative min-h-screen h-screen">
        <Nav />
        <div class="lg:w-1/2 w-full h-full md:overflow-y-scroll">
            <div class="px-5 py-3 flex items-center justify-between">
                <h1 class="text-xl font-bold">Profile</h1>
                <i class="far fa-star text-xl text-red-300"></i>
            </div>
            <div class="md:container">
                <div class="lg:block ml-4 mt-3">
                    <div class="flex flex-col items-center justify-center">
                    <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" alt="image-profil" class="h-40 w-40 rounded-full flex-none"/>
                    <img v-else :src="user.profilePhoto" alt="image-profil" class="h-40 w-40 rounded-full flex-none"/>
                    <h2 class="text-lg font-bold leading-tight"> {{ user.lastname}} {{user.firstname}} </h2>
                    <p class="text-sm font-bold leading-tight"> @{{ user.username }} </p>
                    </div>
                    <p class="font-bold mt-4">Bio:</p>
                    <p class="text-sm mt-1"> {{ user.bio }}</p>
                </div>

                <div class="mt-6 py-4 text-center bg-gray-50 border-lighter">
                    <h3>Publications</h3>
                </div>

                <div v-if="posts.some((post) => user.id == post.UserId)" class="flex flex-col align-center jystify-center">
                    <div v-for="(post, id) in filterPost.slice().reverse()" :key="id">
                        <div  class="w-full p-4 flex flex-col">
                            <div class="flex mr-4" >
                                <img v-if="users.map((user) => {
                                    if (user.id === post.UserId) 
                                    return user.profilePhoto;}).join('') !== (null || '')" 
                                    :src="users.map((user) => {
                                    if (user.id === post.UserId) 
                                    return user.profilePhoto;}).join('')" 
                                alt="image-profil" class="h-12 w-12 rounded-full flex-none"/>
                                <img  v-else src="../assets/icon/icon.png" alt="image-profil" class="h-10 w-10 rounded-full flex-none"/>
                                <p class="mt-3 ml-3 font-semibold"> {{ post.userName }} </p>
                                <button v-if="userinf.id == post.UserId || userinf.id == 1" @click="deletePost(post)" name="delete" class="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div  class="w-full" >
                                
                                <h2 class="text-base text-center py-2">{{ post.title }}</h2>
                                <div class="align-center justify-center flex flex-col">
                                    <img v-if="post.attachment !== '' && post.attachment !== null && (post.attachment.split('.')[2] === 'png' || 'jpg' || 'gif')" :src="post.attachment" alt="image-post" class="px-4 max-w-xl">
                                    <p class="text-sm py-2">{{ post.content }}</p>
                                </div>
                                
                            </div>
                            <div class="flex items-center text-sm text-dark">
                                <router-link :to="`/poste/${post.id}`"><i class="far fa-comment mr-3"></i></router-link>
                                <div>{{ comments.filter((comment) => {
                                    return comment.PostId == post.id;}).length}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="my-5 px-5">
                    <h1>Il n'y a pas de publications pour le moment... </h1>
                </div>
            </div>
        </div>
        <Amis />
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Amis from '@/components/Amis.vue';

import { mapState } from 'vuex'
import axios from 'axios'
export default {
    name: 'FriendProfile',
    components: {
        Nav,
        Amis

    },
    data() {
        return{
            id: this.$route.params.id,
            user: []
        }
    },
    created() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return ;
        }
        axios.get(`http://localhost:3000/api/users/${this.id}`)
        .then(response => {
            this.user = response.data   
               
        })
        
    },
    mounted(){
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
        this.$store.dispatch('getPostsInfos');
        this.$store.dispatch('getComments');
    },
    computed: {
        ...mapState({
            userinf: 'userInfos',
            users() {
                return this.$store.state.users
            },
            posts() {
                return this.$store.state.posts
            },
            comments() {
                return this.$store.state.comments
            },
            filterPost() {
                return this.posts.filter((post) => {
                    return post.UserId == this.user.id;
                })
            }
        })
    },
    methods: {
        deletePost: function (post) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
            if (response) {
                this.$store.dispatch('deletePost', post)
                this.$router.go('/');
                return;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
