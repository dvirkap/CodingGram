<template>
  <div id="app">
    <NavBar/>
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
  },
}
</script>




