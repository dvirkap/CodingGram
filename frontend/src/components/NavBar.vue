<template>
  <div class="navbar">
    <div class="navbar-cont wrapper">
      <div class="navbar-logo-cont">
		  
        <router-link to="/"><img class="navbar-logo" src="../images/logoIcon.png" alt></router-link>
          <div class="navbar-logo-txt">
            <router-link to="/"><span>CodingGram</span></router-link>
          </div>
      </div>
      <div class="navbar-search-cont">

		  <input type="text" placeholder="What are you looking for?...">
      
	  </div>
      <div class="navbar-routers-cont">
        
        <!-- <router-link to="/"><img class="navbar-routers" src="../images/clap.svg" alt></router-link> -->
        <!-- <router-link to="/"><i class="fas fa-user">Hello Guest</i></router-link> -->
        <router-link to="/login"> <span uk-icon="user"></span> Login</router-link>
        <router-link to="/signup"> <span uk-icon="sign-in"></span> Sign In</router-link>


         
        <!-- <router-link to="/">signup </router-link> -->
        <!-- <router-link to="/">login</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/PostService.js'
export default {
  name: "NavBar",
  props: {},
  components: {
    // PostService
  },
};

</script>


<style scoped>
a{

  text-decoration: none;
}

</style>
