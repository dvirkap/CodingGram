<template>
  <!-- <div class="home"> -->
    <div class="main-cont wrapper">
      <user-panel></user-panel>
      <post-list :posts="posts" class="posts-cont"></post-list>
      <user-bar></user-bar>
    </div>
  <!-- </div> -->
</template>



<script>
import PostList from "../components/PostList";
import UserBar from "../components/UserBar.vue";
import UserPanel from "../components/UserPanel.vue";

export default {
  components: {
    PostList,
    UserBar,
    UserPanel
  },
  data() {
    return {
      name: ""
    };
  },
    computed: {
      posts() {
      return this.$store.getters.postsFiltered;
    }
    },
  methods: {
    getUser() {}
  },
  	created() {
    this.$store.dispatch("loadPosts");
  }
};
</script>


