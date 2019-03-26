<template>
  <div class="home">
    <div class="main-cont wrapper">
      <post-list :user="user" :posts="posts" class="posts-cont"></post-list>
      <UserBar></UserBar>
    </div>
  </div>
</template>



<script>
import PostList from "../components/PostList";
import UserBar from "../components/UserBar.vue";

export default {
  components: {
    PostList,
    UserBar
  },
  data() {
    return {
      name: ""
    };
  },
    computed: {
      posts() {
      return this.$store.getters.postsFiltered;
    },
    user(){
      return this.$store.getters.getCurrUser
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


