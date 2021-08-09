<template>
  <div class="md:flex relative min-h-screen h-screen">
    <Nav />
    <div class="lg:w-1/2 w-full h-full">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Profile</h1>
        <i class="far fa-star text-xl text-red-300"></i>
      </div>
      <div class="container">
          <div class="lg:block ml-4 mt-3">
            <div class="flex flex-col items-center justify-center">
              <img v-if="user.profilePhoto === null" src="../assets/icon/icon.png" alt="image-profil" class="h-20 w-20 rounded-full flex-none"/>
              <img v-else :src="user.profilePhoto" alt="image-profil" class="h-40 w-40 rounded-full flex-none"/>
              <h2 class="text-lg font-bold leading-tight"> {{ user.lastname}} {{user.firstname}} </h2>
              <p class="text-sm font-bold leading-tight"> @{{ user.username }} </p>
            </div>
            <p class="font-bold mt-4">Bio:</p>
            <p class="text-sm mt-1"> {{ user.bio }}</p>
          </div>

          <div>
            <div class="mt-3 flex items-center justify-around" v-if="mode === 'userProfile'">
              <button @click="deleteProfileUser(user)" name="delete" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
                Supprimer
              </button>
              <button @click="switchToModifProfile()" name="modifier" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
                Modifier
              </button>
            </div>
            <div v-if="mode == 'modifProfile'" class="mt-10">
              <form class="mx-4">
                <div class="mt-5 md:mt-0 md:col-span-2">
                  <div class="mt-10 sm:mt-0 w-full ">
                    <div class="mt-4">
                      <div class="px-2 py-5 bg-white">
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Nom</label>
                            <input v-model="lastname" type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 focus:outline-none  block w-full shadow sm:text-sm border-gray-300 rounded-md">
                          </div>
                            
                          <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block text-sm font-medium text-gray-700">Prénom</label>
                            <input v-model="firstname" type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 focus:outline-none  block w-full shadow sm:text-sm border-gray-300 rounded-md">
                          </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="username" class="block text-sm font-medium text-gray-700">Pseudo</label>
                              <input v-model="username" type="text" name="username" id="username" class="mt-1 focus:outline-none  block w-full shadow sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </div>
                      </div>    
                    </div>
                  </div>
                  <div>
                    <label for="about" class="block text-sm font-medium text-black">
                      Mettre à jour votre bio :
                    </label>
                    <div class="mt-1">
                      <textarea v-model="bio" id="about" name="about" rows="3" class="shadow-sm focus:outline-none mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Décrivez-vous"></textarea>
                    </div>
                  </div>

                  <div class="mt-4">
                    <label class="block text-sm font-medium text-black">
                      Photo
                    </label>
                    <div class="mt-1 flex items-center">
                      <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg data-v-1084b650="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><!----> <!----> <rect data-v-1084b650="" fill="#FFFFFF" x="0" y="0" width="300px" height="300px" class="logo-background-square"></rect> <!----> <!----> <g data-v-1084b650="" id="640fb903-7c97-3a8b-d0a7-369102908d0a" fill="#FFD7D7" stroke="none" transform="matrix(0.8499999999999999,0,0,0.8499999999999999,22.500006484985377,22.50005836486818)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100"><switch><g><path d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"></path></g></switch></svg></g></svg>
                      </span>
                      <button @click="$refs.image.click()" name="changer-photo" type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-red-500 hover:text-white focus:outline-none  ">
                        Changer
                      </button>
                      <input style="display: none" type="file" ref="image" @change="onFileSelected()">
                    </div>
                  </div>
                  <div class="px-4 py-3  text-right sm:px-6">
                    <button name="publier" @click="submit()" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
                      <span v-if="submitStatus == 'loading'">Envoie...</span>  
                      <span v-else >Publier</span> 
                    </button>
                  </div>
                </div>
              </form>
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

import { mapState } from 'vuex'
import axios from "axios";
export default {
  name: 'Profile',
  components: {
    Nav,
    Amis

  },
  created: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getUserInfos');
  },
  data: function () {
    return {
      mode: 'userProfile',
      submitStatus: null,
      firstname: "",
      lastname: "",
      username: "",
      bio: "",
      profilePhoto: null,
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    switchToModifProfile: function() {
      this.mode = "modifProfile"
    },
    switchToUserProfile: function() {
      this.mode = "userProfile"
    },
    onFileSelected: function() {
      this.profilePhoto = this.$refs.image.files[0]
      console.log(this.profilePhoto)
    },
    submit(){
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = user.token;
            

      const fd = new FormData();
      if (this.profilePhoto != null || "") {
        fd.append('image', this.profilePhoto, this.profilePhoto.filename);
        fd.append('firstname', this.firstname)
        fd.append('lastname', this.lastname)
        fd.append('username', this.username)
        fd.append('bio', this.bio)
      } else{
        fd.append('firstname', this.firstname)
        fd.append('lastname', this.lastname)
        fd.append('username', this.username)
        fd.append('bio', this.bio)
      }
      this.submitStatus = "loading"
      axios.put("http://localhost:3000/api/users/userId", fd, {

      })
      .then(response => {
        this.firstname = response.data
        this.lastname = response.data
        this.username = response.data 
        this.bio = response.data 
        this.profilePhoto = response.data 
        this.$router.go("/profile");
      })
      
                
    },           
    deleteProfileUser: function(user) {
      let response = confirm('Êtes-vous sûr de vouloir supprimer ce compte? ')
      if (response) {
        this.$store.dispatch('deleteProfileUser', user)
        this.$router.push('/userProfileDelete');
        return;
      }
    },
  }
}
</script>

<style scoped>
</style>