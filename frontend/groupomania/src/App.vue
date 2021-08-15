<template>
 
  <router-view :key="$route.fullPath"></router-view>

</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created() {

    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization =  `${this.$store.state.user.token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&family=Roboto:ital,wght@1,300&display=swap');
* {
  font-family: 'Noto Sans JP','Roboto', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
img{
  object-fit: cover;
}

</style>