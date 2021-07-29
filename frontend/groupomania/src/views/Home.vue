<template>
  <div id='home' class="flex container h-screen w-full">
    <Nav />
    <Postes />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Postes from '@/components/Postes.vue';
export default {
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
      
    }
    this.$store.dispatch('getUserInfos');
    this.$store.dispatch('getPostsInfos');
  },
  name: "Home",
  components: {
    Nav,
    Postes,
  },
};
</script>