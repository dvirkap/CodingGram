<template>
  <section class="post">

    <post
        @deletePost="deletePost"  
        :LoggedInUser="LoggedInUser" 
        :post="post"/>
    <post-bar 
        :post="post"
        @addLike="addLike"/>
    <comments-list
        class="comment-list"
        @addComment="addComment"
        :LoggedInUser="LoggedInUser"
        :comments="post.comments"
        :post="post"/>
  </section>
</template>

<script>
import Post from "@/components/Post.vue";
import PostBar from "@/components/PostBar.vue";
import CommentsList from "@/components/CommentsList.vue";

export default {
  components: {
    Post,
    PostBar,
    CommentsList
  },
  props: ["post", "LoggedInUser"],
  methods: {
    addComment(newCmt) {
      this.$emit("addComment", newCmt);
    },
    addLike(post) {
      this.$emit('addLike', post)
    },
    deletePost(post){
      this.$emit('deletePost', post)
    },
  }
};
</script>

<style>
</style>
