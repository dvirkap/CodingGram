<template>
  <div class="navbar">
    <div class="navbar-cont navWrapper">


      <div class="navbar-logo-cont">
		  
        <router-link to="/"><img class="navbar-logo" src="../images/logoIcon.png" alt></router-link>
          <div class="navbar-logo-txt">
            <router-link to="/"><span>CodingGram</span></router-link>
          </div>


      </div>

      <div class="navbar-search-cont">

		  <input v-model="filterByTxt" @keyup="setFilter()" type="text" placeholder="What are you looking for?...">
      
	  </div>
    

      <div class="navbar-routers-cont">
        <select class="">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <!-- <router-link v-if="LoggenInUser" to="/"><span uk-icon="user"></span> Hello {{LoggenInUser.userName}} </router-link> -->


      </div>
    </div>


  </div>
  
</template>

<script>
import PostService from '@/services/PostService.js'
export default {
  name: "NavBar",
  props: [],
  components: {
  },
  data() {
    return {
      filterByTxt: '',
    }
  },
  methods: {
    setFilter(){
    this.$store.dispatch("loadPosts" ,this.filterByTxt);
    },
    logout(){
      console.log('navvv')

    this.$store.dispatch("Logout");
    }
  },
  computed: {
    LoggenInUser(){
      return this.$store.getters.getCurrUser
    }
  },
};

</script>


<style scoped>
a{

  text-decoration: none;
}
select{
    background: #141414;

}



</style>
