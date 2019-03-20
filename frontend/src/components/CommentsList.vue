<template>
  <section>
    <div class="post-feedback">
      <Comment></Comment>
      <p>coment1</p>
      <p>coment1</p>
      <p>coment1</p>
    </div>

    <div class="post-comment">
      <div class="post-comment-input">
        <p>Add comment...</p>
      </div>
    </div>
  </section>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  name: "CommentsList",
  components: {
      Comment
  }
};
</script>

<style>
</style>
