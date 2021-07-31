<template>
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
        <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
            <h1 class="text-xl font-bold">Accueil</h1>
            <i class="far fa-star text-xl text-red-300"></i>
        </div>
        <div class="px-5 py-3 border-b-8 border-lighter flex">
            <div class="flex-none">
                <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                <img v-else src="{{ user.profilePhoto }}" class="h-12 w-12 rounded-full flex-none"/>
            </div>
            <form @submit.prevent="submit" class="w-full px-4 relative">
                <div >
                    <input v-model="title" name="title" type="text" placeholder="Titre" class="mt-3 pb-3 w-full focus:outline-none"/> 
                </div>
                <div >
                    <textarea v-model="content" name="content"  placeholder="Quoi de neuf ?" class="mt-3 pb-3 w-full focus:outline-none"/>
                </div>   
                <!-- <div class=" pb-9 flex items-center">
                    <label class="mb-3 text-primary" for="attachment"/>
                    <i class="text-lg text-red-300 mr-4 far fa-image"></i>
                    <input type="file" ref="image" @change="onFileSelected()">
                </div> -->
                <div v-if="submitStatus == 'error_create'">
                    Il manque l'un des paramètres, veuillez tout remplir !
                </div>
                <button type="submit" :disabled="submitStatus == 'loading'" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full absolute bottom-0 right-0">
                    <span v-if="submitStatus == 'loading'">Envoie...</span>  
                    <span v-else>Publier</span>      
                </button>  
            </form>
        </div>
        <div v-for="(post, id) in posts.slice().reverse()" class="flex flex-col-reverse" :key="id">
            <div  class="w-full p-4 border-b hover:bg-lighter flex">
                <div class="flex-none mr-4">
                    <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                    <img v-else src="{{ user.profilePhoto }}" class="h-12 w-12 rounded-full flex-none"/>
                </div>
                <div  class="w-full" >
                    <div class="flex items-center w-full">
                        <p class="font-semibold"> {{ post.userName }} </p>
                        <p class="text-sm text-dark ml-2"> </p>
                        <button v-if="user.id == post.UserId || user.id == 1" @click="deletePost(post)" class="ml-auto">
                            <i class="fas fa-trash-alt text-dark"></i>
                        </button>
                        
                    </div>
                        <p class="py-2">{{ post.title }}</p>
                        <p class="py-2">{{ post.content }}</p>
                    <div class="flex items-center justify-between w-full">
                        <button class="flex items-center text-sm text-dark">
                            <i class="fas fa-heart text-red-300 mr-3"></i>
                            <p> nombre likes </p>
                        </button>
                    </div>
                </div>
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
                // image: null || "",
                title: "",
                content: "",
                // attachment: null || "",
                submitStatus: null,
                userId: localStorage.getItem("userId") || null,

            }
        },
        computed: {
            ...mapState({
                user: 'userInfos',
                posts() {
                    return this.$store.state.posts
                }
            }),
        },
        methods: {
            // onFileSelected: function() {
            //     this.image = this.$refs.image.files[0]
            //     console.log(this.image)
            // },
            submit(){
                 const fd = new FormData();
                // if (this.image != null || "") {
                //     // fd.append('image', this.image, this.image.name);
                //     fd.append('title', this.title)
                //     fd.append('content', this.content)
                //     fd.append("userId", this.userId);
                // }else {
                    
                // }
                if (this.title != "" && this.content != "") {
                    fd.append('title', this.title);
                    fd.append('content', this.content);
                    this.submitStatus = "error_create"
                } else {
                    this.submitStatus = "loading";
                    axios.post("http://localhost:3000/posts/new",fd)
                    .then((response) => {
                        console.log(response);
                        console.log(fd);
                        this.$router.push("/");
                    })
                    .catch((error) => (
                        (this.submitStatus = "error_create"), console.log(error)
                    ))
                }
            },
            deletePost: function (post) {
                let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
                if (response) {
                   this.$store.dispatch('deletePost', post)
                   this.$router.push('/');
                   return;
                }
            }
        }
    }
</script>

