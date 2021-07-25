<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  
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
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(137deg, #fd2c02 0%, #ffd7d7 100%);
}
</style>