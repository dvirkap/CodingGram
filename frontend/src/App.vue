<template>
  <div id="app">
    <NavBar/>
    <!-- <div id="nav"> -->

            <!-- <router-link to="/">Home</router-link> | -->
            <!-- <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<style>

</style>
<script>
import UIkit from '../node_modules/uikit';
import Icons from '../node_modules/uikit/dist/js/uikit-icons';
UIkit.use(Icons);

import NavBar from './components/NavBar'

export default {
  components:{
    NavBar,
  },
  created() {
    // this.$store.dispatch('checkLoggedInUser')
  },
}
</script>




