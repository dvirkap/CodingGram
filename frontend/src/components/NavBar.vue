<template>
  <div class="navbar">
    <div class="navbar-cont navWrapper">
      <div  class="navbar-logo-cont">
        <router-link to="/">
          <img class="navbar-logo" src="../images/logoIcon.png" alt>
        </router-link>
        <div v-if="!searchTab" class="navbar-logo-txt">
          <router-link to="/">
            <span>CodingGram</span>
          </router-link>
        </div>
      </div>

      <div class="navbar-search-cont">
        <input
          v-model="filterByTxt"
          @keyup="setFilter()"
          type="text"
          placeholder="What are you looking for?...">
      </div>

      <div v-if="searchTab" class="navbar-search-cont-mobile-input">
        <input
          v-model="filterByTxt"
          @keyup="setFilter()"
          type="text"
          placeholder="Search Something...">
      </div>


      <div class="navbar-search-cont-mobile">
        <button @click="searchTab = !searchTab"><i class="fas fa-search"></i></button>
      </div>


      <div class="navbar-routers-cont">
        <h1>Editor theme:</h1>
        <select ref="select" @change="setTheme()">
          <option value="dark" >Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: [],
  components: {},
  data() {
    return {
      searchTab: false,
      filterByTxt: ""
    };
  },
  methods: {
    setTheme(val) {
      this.$store.dispatch("setTheme", this.$refs.select.value);


    },
    setFilter() {
      this.$store.dispatch("loadPosts", this.filterByTxt);
    },
  },
  computed: {
  }
};
</script>


<style scoped>
a {
  text-decoration: none;
}
select {
  background: rgb(66, 66, 66);
}
</style>
