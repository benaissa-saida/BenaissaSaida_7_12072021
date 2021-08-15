<template>
    <div class="md:flex relative min-h-screen h-screen">
        <Nav />
        <div class="lg:w-1/2 w-full h-full md:overflow-y-scroll">
            <div  class="flex flex-col">
 
                    <div  class="w-full p-4 hover:bg-lighter flex flex-col">
                        <div class="md:container">
                        <div class="flex mr-4">
                            <img v-if="users.map((user) => {
                                if (user.id === post.userId) 
                                return user.profilePhoto;}).join('') !== (null || '')" 
                                :src="users.map((user) => {
                                if (user.id === post.userId) 
                                return user.profilePhoto;}).join('')" 
                            alt="image-profil" class="h-12 w-12 rounded-full flex-none"/>
                            <img  v-else src="../assets/icon/icon.png" alt="image-profil" class="h-10 w-10 rounded-full flex-none"/>
                            <div class=" ml-3 flex flex-col">
                                <p class="font-semibold"> {{ post.userName }} </p>
                                <p class="font-thin text-sm"> {{formattedDate}} </p>
                            </div>
                            <button v-if="user.id == post.userId || user.isAdmin == 1" @click="deletePost(post)" name="delete" class="ml-auto w-8 h-8 ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <div  class="w-full" >
                            <h2 class="text-base text-center py-2">{{ post.title }}</h2>
                            <div class="flex align-center justify-center ">
                                <img id="post_img" v-if="post.attachment !== null && post.attachment !== '' " :src="post.attachment" alt="image-post">
                            </div>
                            <p class="text-sm py-2">{{ post.content }}</p>
                        </div>
                        </div>
                        <!-- Début des commentaires -->

                        <div v-for="(comment, id) in comments" class="flex w-full flex-col justify-center  bg-red-50 mt-4 py-2" :key="id">
                            <div class="flex">
                                <div>
                                    <img v-if="users.map((user) => {
                                        if (user.id === comment.userId) 
                                        return user.profilePhoto;}).join('') !== (null || '')" 
                                        :src="users.map((user) => {
                                        if (user.id === comment.userId) 
                                        return user.profilePhoto;}).join('')" alt="image-profil" class="ml-2 h-10 w-10 rounded-full flex-none"/>
                                    <img v-else src="../assets/icon/icon.png" alt="image-profil" class="h-10 w-10 ml-2 rounded-full flex-none"/>
                                </div>
                                <div class="flex flex-col ml-3">
                                    <p class="mb-2">{{ comment.userName }}</p>
                                    <p class="text-sm">{{ comment.comment }}</p>
                                </div>
                                <button v-if="user.id == comment.userId || user.isAdmin == 1" @click="deleteComment(comment)" name="delete" class="ml-auto flex-end w-8 h-8 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                        <form @submit.prevent="submitCom()" class="mt-2">
                             <div class="flex ">
                                <img v-if="user.profilePhoto !== null || ''" :src="user.profilePhoto" alt="image-profil" class="md:ml-2 h-10 w-10 rounded-full flex-none"/>
                                <img v-else src="../assets/icon/icon.png" alt="image-profil" class="md:ml-2 h-10 w-10 rounded-full flex-none"/>
                                <input type="text" v-model="comment" placeholder="Commentaire..." class="focus:outline-none w-full ml-2">
                                <button :class="{'button--disabled' : !validatedFields}" name="send-comment" class="sm:px-3 h-9 px-2 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full ">
                                    <span v-if="submitStatus == 'loading'">Envoie...</span>  
                                    <span v-else >Publier</span>      
                                </button>
                            </div>
                            <div v-if="submitStatus == 'error_create'" class="text-red-600">
                                Il doit faire au minimum 3 lettres 
                            </div>
                        </form>
                    </div>
            </div>
        </div>
        <Amis />
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Amis from '@/components/Amis.vue';
import { mapState } from 'vuex';
import axios from 'axios'
import moment from 'moment'

export default ({
    name: 'Poste',
    components: {
    Nav,
    Amis,
  },
    data() {
        return{
            id: this.$route.params.id,
            post: [],
            comments: [], 
            comment: "",
            submitStatus: null,
        }
    },
    created() {
        axios.get(`http://localhost:3000/api/posts/${this.id}`)
        .then(response => {
            this.post = response.data.post
           if (this.post){
               this.comments = response.data.comments
           }            
        })
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos',
            users() {
                return this.$store.state.users
            },
        }),
        validatedFields: function () {  
            if (this.comment != "" ) {
                return true;
            } else {
                return false;
            }
                
        },
        formattedDate (){
            return moment(this.post.createdAt).format('DD-MM-YYYY');
        }
    },
    methods: {
        deletePost: function (post) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
            if (response) {
                this.$store.dispatch('deletePost', post)
                this.$router.push('/home');
                return;
            }
        },
        submitCom: function (){
            this.submitStatus = "loading"
            axios.post(`http://localhost:3000/api/comments/${this.id}`, {
                comment: this.comment
            }).then(response => {
                this.comment = response.data.comment
                this.$router.go('/');
            }).catch((error) => (
                (this.submitStatus = "error_create"), console.log(error)
            ));

        },
        deleteComment: function (comment) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ? ')
            if (response) {
                this.$store.dispatch('deleteComment', comment)
                this.$router.go('/');
                return;
            }
        },

    }
    
})
</script>

<style scoped>
post_img {
  width: 50% !important;
  height: 50% !important;
}
.button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
</style>
