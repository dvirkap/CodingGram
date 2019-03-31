<template>
  <section class="post">
    <post
      :editorTheme="editorTheme"
      @deletePost="deletePost"
      :LoggedInUser="LoggedInUser"
      :post="post"
    />

    <post-bar :LoggedInUser="LoggedInUser" :post="post" @addLike="addLike"/>
    <comments-list
      class="comment-list"
      @approved="approved"
      @addReplay="addReplay"
      @showCommentCode="showCommentCode"
      @addComment="addComment"
      @addCommentCode="addCommentCode"
      @deleteComment="deleteComment"
      @likeComment="likeComment"
      :LoggedInUser="LoggedInUser"
      :comments="post.comments"
      :post="post"
    />
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
  props: ["post", "LoggedInUser", "editorTheme"],
  methods: {
    approved(postToUpdate) {
      this.$emit("approved", postToUpdate);
    },
    addReplay(newReply) {
      this.$emit("addReplay", newReply);
    },
    deleteComment(commentId, postId) {
      this.$emit("deleteComment", commentId, postId);
    },
    addComment(newComment, postId) {
      this.$emit("addComment", newComment, postId);
    },
    addLike(post) {
      this.$emit("addLike", post);
    },
    deletePost(post) {
      this.$emit("deletePost", post);
    },
    addCommentCode(post) {
      console.log("added 2", post);
      this.$emit("addCommentCode", post);
    },
    showCommentCode(comment) {
      this.$emit("showCommentCode", comment);
    },
    likeComment(payload) {
      this.$emit("likeComment", payload);
    }
  }
};
</script>

<style>
</style>
