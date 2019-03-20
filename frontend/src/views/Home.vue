<template>
  <div class="home">
    <div class="main-cont wrapper">
      <post-list class="posts-cont"></post-list>

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
  methods: {
    getUser() {}
  },
//   	created() {
//     	this.$store.dispatch({ type: "getPosts"});
//   }
};
</script>


