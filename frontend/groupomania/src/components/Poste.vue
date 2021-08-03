<template>
    <div class="flex  h-screen w-full">
        <Nav />
        <div class="w-full md:w-1/2 h-full overflow-y-scroll">
            <div  class="flex flex-col">
                <div class="flex flex-col-reverse">
                    <div  class="w-full p-4 border-b hover:bg-lighter flex flex-col">
                        <div class="flex-none mr-4">
                            <img v-if="user.id === post.UserId" :src="user.profilePhoto" class="h-12 w-12 rounded-full flex-none"/>
                            <img  src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                        </div>
                        <div  class="w-full" >
                            <div class="flex items-center w-full">
                                <h2 class="font-semibold"> {{ post.userName }} </h2>
                                <p class="text-sm text-dark ml-2"> </p>
                                <button v-if="user.id == post.UserId || user.id == 1" @click="deletePost(post)" class="ml-auto w-8 h-8 rounded-full hover:bg-red-600">
                                    <i class="fas fa-trash-alt text-dark"></i>
                                </button>
                            </div>
                            <h3 class="py-2">{{ post.title }}</h3>
                            <div >
                                <img v-if="post.attachment !== null " :src="post.attachment" alt="image-video">
                            </div>
                            <p class="py-2">{{ post.content }}</p>
                        </div>
                        <!-- Début des commentaires -->

                        <!-- <div v-for="(comment, id) in comments.map(comment => comment.postId == post.id)" class="flex w-full flex-col justify-center  mt-10" :key="id">
                            <div class="flex">
                                <div>
                                    <img v-if="users.map((user) => { if (user.id === comment.UserId) return user.profilePhoto;}).join('') !== (null || '')" :src="users.map((user) => { if (user.id === comment.UserId) return user.profilePhoto;}).join('')" class="h-12 w-12 rounded-full flex-none"/>
                                    <img v-else src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                                </div>
                                <div class="flex flex-col align-start pl-3">
                                    <h4>{{ comment.userName }}</h4>
                                    <p>{{ comment.comment }}</p>
                                </div>
                            </div>
                            <button v-if="user.id == comment.UserId || user.id == 1" @click="deleteComment(comment)" class="ml-auto w-8 h-8 rounded-full hover:bg-red-600">
                                <i class="fas fa-trash-alt text-dark"></i>
                            </button>
                            <form @submit.prevent="submitCom(post)" class="bg-red-50 ">
                                <div class="flex">
                                    <img v-if="user.profilePhoto !== null || ''" :src="user.profilePhoto" class="h-12 w-12 rounded-full flex-none"/>
                                    <img v-else src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                                    <input type="text" v-model="commentaire" placeholder="Commentaire..." class="focus:outline-none w-full">
                                </div>
                                <div v-if="submitStatus == 'error_create'">
                                    Veuillez remplir le champs avant envoie. 
                                </div>
                            </form>
                        </div> -->
                    </div>
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
            commentUserId: "",


        }
    },
    mounted() {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = user.token;

        axios.get(`http://localhost:3000/api/posts/userPost/${this.id}`)
        .then(response => {
            this.post = response.data.post
           if (response.data.post){
               this.comments = response.data.comments
               this.commentUserId = response.data.comments.userId
               return console.log(response.data.comments)
           }

            
        })

        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    
})
</script>
