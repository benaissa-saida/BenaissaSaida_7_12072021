<template>
  <div id='home' class="flex  h-screen w-full">
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
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
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