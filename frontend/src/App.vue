<template>
  <div id="app">
    <NavBar/>
    <user-panel @Logout="Logout" :LoggedInUser="LoggedInUser"></user-panel>

    <router-view/>
  </div>
</template>

<style>
</style>
<script>
import UIkit from "../node_modules/uikit";
import Icons from "../node_modules/uikit/dist/js/uikit-icons";
UIkit.use(Icons);

import NavBar from "./components/NavBar";
import UserPanel from "./components/UserPanel.vue";

export default {
  components: {
    NavBar,
    UserPanel
  },
  computed: {
        LoggedInUser() {
      return this.$store.getters.getCurrUser;
    }
  },
  methods: {
    Logout() {
      this.$store.dispatch("Logout");
    }
  },
  created() {
    this.$store.dispatch("checkLoggedInUser");
  }
};
</script>




