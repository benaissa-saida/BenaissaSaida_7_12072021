<template>
  <div id='home' class="md:flex relative min-h-screen h-screen">
    <Nav />
    <Postes />
    <Amis />
   
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Postes from '@/components/Postes.vue';
import Amis from '@/components/Amis.vue';
export default {
  
  created(){
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getUserInfos');
    this.$store.dispatch('getPostsInfos');
    this.$store.dispatch('getComments');
  },
  name: "Home",
  components: {
    Nav,
    Postes,
    Amis,
  },
};
</script>