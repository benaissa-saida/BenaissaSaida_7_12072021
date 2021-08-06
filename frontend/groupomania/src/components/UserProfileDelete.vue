<template>
	<div id="body-card">
    <div class="card">
      <h1 class="card__title">Votre compte à bien été supprimé !</h1>
      <p class="card__subtitle">Souhaitez-vous retourner à l'accueil ? <router-link :to="`/`"><span class="card__action">Accueil</span></router-link></p>
    </div>
	</div>
</template>

<script>
export default {
  name: "UserProfileDelete",
}
</script>

<style scoped>
#body-card{
  background-image: linear-gradient(137deg, #fd2c02 0%, #ffd7d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
.card__action {
  color:#E53935;
  text-decoration: underline;
}
.card__action:hover {
  cursor:pointer;
}
</style>