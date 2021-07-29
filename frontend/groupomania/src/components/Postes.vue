<template>
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
        <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
            <h1 class="text-xl font-bold">Accueil</h1>
            <i class="far fa-star text-xl text-blue"></i>
        </div>
        <div class="px-5 py-3 border-b-8 border-lighter flex">
            <div class="flex-none">
                <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                <img v-else src="{{ user.profilePhoto }}" class="h-12 w-12 rounded-full flex-none"/>
            </div>
            <form v-on:submit.prevent = "" class="w-full px-4 relative">
                <textarea placeholder="Titre" class="mt-3 pb-3 w-full focus:outline-none"/>    
                <textarea placeholder="Quoi de neuf ?" class="mt-3 pb-3 w-full focus:outline-none"/>
                <div class="flex items-center">
                    <i class="text-lg text-blue mr-4 far fa-image"></i>
                </div>
                <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
                    Publier !
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
                        <i class="fas fa-angle-down text-dark ml-auto"></i>
                    </div>
                        <p class="py-2">
                        {{ post.title }}
                        </p>
                        <p class="py-2">
                        {{ post.content }}
                        </p>
                    <div class="flex items-center justify-between w-full">
                        <button class="flex items-center text-sm text-dark">
                            <i class="fas fa-heart mr-3"></i>
                            <p> nombre likes </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div  class="w-full p-4 border-b hover:bg-lighter flex">
            <div class="flex-none mr-4">
                <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" class="h-12 w-12 rounded-full flex-none"/>
                <img v-else src="{{ user.profilePhoto }}" class="h-12 w-12 rounded-full flex-none"/>
            </div>
            <div class="w-full">
                <div class="flex items-center w-full">
                    <p class="font-semibold">  </p>
                    <p class="text-sm text-dark ml-2">  </p>
                    <p class="text-sm text-dark ml-2">  </p>
                    <i class="fas fa-angle-down text-dark ml-auto"></i>
                </div>
                <p class="py-2">
                    
                </p>
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center text-sm text-dark">
                        <i class="far fa-comment mr-3"></i>
                        <p>  </p>
                    </div>
                    <div class="flex items-center text-sm text-dark">
                        <i class="fas fa-retweet mr-3"></i>
                        <p>  </p>
                    </div>
                    <div class="flex items-center text-sm text-dark">
                        <i class="fas fa-heart mr-3"></i>
                        <p>  </p>
                    </div>
                    <div class="flex items-center text-sm text-dark">
                        <i class="fas fa-share-square mr-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        computed: {
        ...mapState({
            user: 'userInfos',
            posts() {
                return this.$store.state.posts
            }
            
        }),
        },
        methods: {
        
        }
    }
</script>
