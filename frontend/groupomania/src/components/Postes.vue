<template>
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
        <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
            <h1 class="text-xl font-bold">Accueil</h1>
            <i class="far fa-star text-xl text-red-300"></i>
        </div>
        <div class="px-5 py-3 border-b-8 border-lighter flex">
            <div class="flex-none">
                <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                <img v-else :src="user.profilePhoto" class="h-12 w-12 rounded-full flex-none"/>
            </div>
            <form @submit.prevent="submit" class="w-full px-4 relative">
                <div >
                    <input v-model="title" id="title" type="text" placeholder="Titre" class="mt-3 pb-3 w-full focus:outline-none"/> 
                </div>
                <div >
                    <input v-model="content" id="content"  placeholder="Quoi de neuf ?" class="mt-3 pb-3 w-full focus:outline-none"/>
                </div>   
                <div class=" pb-9 flex items-center">
                    <label class="mb-3 text-primary" for="attachment"/>
                    <button @click="$refs.image.click()"><i class="text-lg text-red-300 mr-4 far fa-image"></i></button>
                    <input style="display: none" type="file" ref="image" @change="onFileSelected()">
                </div>
                <div v-if="submitStatus == 'error_create'">
                    Il manque l'un des paramètres, veuillez tout remplir !
                </div>
                <button :class="{'button--disabled' : !validatedFields}" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full absolute bottom-0 right-0">
                    <span v-if="submitStatus == 'loading'">Envoie...</span>  
                    <span v-else >Publier</span>      
                </button>  
            </form>
        </div>
        <div  class="flex flex-col">
            <div v-for="(post, id) in posts.slice().reverse()" class="flex flex-col-reverse" :key="id">
                <router-link :to="`/poste/${post.id}`">
                <div  class="w-full p-4 border-b hover:bg-lighter flex flex-col">
                    <div class="flex-none mr-4">
                        <img v-if="users.map((user) => { if (user.id === post.UserId) return user.profilePhoto;}).join('') !== (null || '')" :src="users.map((user) => { if (user.id === post.UserId) return user.profilePhoto;}).join('')" class="h-12 w-12 rounded-full flex-none"/>
                        <img v-else src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
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
                        <div>
                            <img v-if="post.attachment !== '' && post.attachment !== null && (post.attachment.split('.')[2] === 'png' || 'jpg')" :src="post.attachment" alt="image-video">
                        </div>
                        <p class="py-2">{{ post.content }}</p>
                    </div>
                </div>
                </router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from "axios";
    export default {
        name: 'Postes',
        data: function(){
            return{
                title: "",
                content: "",
                attachment: null,
                submitStatus: null,
                commentaire: "",
            }
        },
        computed: {
            ...mapState({
                user: 'userInfos',
                users() {
                    return this.$store.state.users
                },
                posts() {
                    return this.$store.state.posts
                },
                comments() {
                    return this.$store.state.comments
                }
            }),
            // filteredComment() {
            //     return comments.filter((comment) => {
            //         return comment.postId = this.post.id
            //     })
            // },
            validatedFields: function () {
                
                if (this.title != "" && this.content != "" && this.attachment) {
                    return true;
                } else {
                    return false;
                }
                
            },
            
        },
        methods: {
            onFileSelected: function() {
                this.attachment = this.$refs.image.files[0]
                console.log(this.attachment)
            },
            submit(){
                let user = localStorage.getItem('user');
                user = JSON.parse(user);
                axios.defaults.headers.common['Authorization'] = user.token;
            

                const fd = new FormData();
                if (this.attachment != null || "") {
                    fd.append('image', this.attachment, this.attachment.filename);
                    fd.append('title', this.title)
                    fd.append('content', this.content)
                    fd.append("user", this.user);
                    this.submitStatus = "loading";
                } else {
                    fd.append('title', this.title)
                    fd.append('content', this.content)
                    fd.append("user", this.user)
                    this.submitStatus = "loading";
                }
                axios.post("http://localhost:3000/api/posts/new", fd)
                .then(response => {
                    this.title = response.data
                    this.content = response.data
                    this.attachment = response.data 
                    this.$router.push("/");
                })
                .catch((error) => (
                    (this.submitStatus = "error_create"), console.log(error)
                ));
                
            },
            deletePost: function (post) {
                let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
                if (response) {
                   this.$store.dispatch('deletePost', post)
                   this.$router.go('/');
                   return;
                }
            },
            submitCom(post) {
                let user = localStorage.getItem('user');
                user = JSON.parse(user);
                axios.defaults.headers.common['Authorization'] = user.token;

                axios.post('http://localhost:3000/api/comments/comment', {
                    comment: this.commentaire,
                    postId: post.id,
                    userId: user.id
                })
                .then(response => {
                    console.log(response.data)
                    this.$router.push("/");
                })
                .catch((error) => (
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
            }
        }
    }
</script>

<style scoped>
.button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
</style>