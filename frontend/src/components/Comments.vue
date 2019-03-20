<template>
  <div>
    <h3>Comments</h3>
    <CommentInput></CommentInput>
    <CommentBar></CommentBar>
    <CommentsContainer></CommentsContainer>
  </div>
</template>

<script>
import CommentInput from "./CommentsCmps/CommentInput.vue";
import CommentBar from "./CommentsCmps/CommentBar.vue";
import CommentsContainer from "./CommentsCmps/CommentsContainer.vue";

export default {
  name: "Comments",
  components: {
    CommentInput,
    CommentBar,
    CommentsContainer
  }
};
</script>

<style>
</style>
