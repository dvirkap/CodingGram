<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <post-container
          @deletePost="deletePost"
          @addComment="addComment"
          @deleteComment="deleteComment"
          @addLike="addLike"
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
  props: ["posts", "LoggedInUser"],
  components: {
    PostContainer
  },
  methods: {
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
    }
  }
};
</script>






 


  
