<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <post-container
          :editorTheme="editorTheme"
          @approved="approved"
          @addReplay="addReplay"
          @showCommentCode="showCommentCode"
          @deletePost="deletePost"
          @addComment="addComment"
          @addCommentCode="addCommentCode"
          @deleteComment="deleteComment"
          @addLike="addLike"
          @likeComment="likeComment"
          :LoggedInUser="LoggedInUser"
          :post="post"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import PostContainer from "@/components/PostContainer.vue";

export default {
  name: "PostList",
  props: ["posts", "LoggedInUser", "editorTheme"],
  components: {
    PostContainer
  },
  methods: {
    approved(postToUpdate) {
      this.$emit("approved", postToUpdate);
    },
    addReplay(newReplay) {
      this.$emit("addReplay", newReplay);
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
      console.log("added 3", post);
      this.$emit("addCommentCode", post);
    },
    showCommentCode(comment) {
      this.$emit("showCommentCode", comment);
    },
    likeComment(payload) {
      this.$emit("likeComment", payload);
    }
  },
  created() {
    console.log("startt!", this.editorTheme);
  }
};
</script>






 


  
