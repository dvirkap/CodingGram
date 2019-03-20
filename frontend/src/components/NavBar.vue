<template>
  <div class="navbar">
    <div class="navbar-cont wrapper">
      <div class="navbar-logo-cont">
		  
        <router-link to="/"><img class="navbar-logo" src="../images/logoIcon.png" alt></router-link>
        <div class="navbar-logo-txt">
          <span>CodingGram</span>
        </div>
      </div>
      <div class="navbar-search-cont">

		  <input type="text" placeholder="What are you looking for?...">
      
	  </div>
      <div class="navbar-routers-cont">
        <router-link to="/"><img class="navbar-routers" src="../images/like.png" alt></router-link>
        <router-link to="/"><img class="navbar-routers" src="../images/profile.png" alt></router-link>
        <router-link to="/"><img class="navbar-routers" src="../images/logout.png" alt></router-link>
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

</style>
