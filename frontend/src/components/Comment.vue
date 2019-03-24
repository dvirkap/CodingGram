<template>
  <section >
    <div class="comment-container">
      <div class="comment-txt">
        {{comment.creator.userName}}:
        {{comment.txt}}
      </div>
      <span @click="removeComment" class="delelte-btn" title="Delete Comment"><i class="far fa-trash-alt"></i></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
  methods: {
    removeComment() {
      this.$store.dispatch('deleteComment', {commentId: this.comment._id});
    }
  }
};
</script>

<style>
</style>
