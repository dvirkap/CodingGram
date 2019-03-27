<template>
  <!-- <div class="home"> -->
    <div class="main-cont wrapper">
      <user-panel></user-panel>
      <post-list
        @deletePost="deletePost"  
        @addComment="addComment"
        @addLike="addLike"
        :LoggedInUser="LoggedInUser"
        :posts="posts"
        class="posts-cont"
      ></post-list>

      <UserBar></UserBar>
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
  computed: {
    posts() {
      return this.$store.getters.postsFiltered;
    },
    LoggedInUser() {
      return this.$store.getters.getCurrUser;
    }
  },
  methods: {
    addComment(newCmt) {
      this.$store.dispatch("addComment", newCmt);
    },
    addLike(post) {
      this.$store.dispatch("addLike", post);
    },
    deletePost(post){
      this.$store.dispatch("deletePost", post);
    },
  },
  created() {
    this.$store.dispatch("loadPosts");
  }
};
</script>


