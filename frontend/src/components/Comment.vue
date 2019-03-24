<template>
  <section >
    <div class="comment-container">
      <div class="comment-txt">
        {{comment.creator.userName}}:
        {{comment.txt}}
      </div>
      <span @click="removeComment" class="delelte-btn" uk-icon="trash" title="Delete Comment"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
  methods: {
    removeComment() {
      console.log('start removing', this.comment.txt ,this.comment._id);  
      this.$store.dispatch('deleteComment', {commentId: this.comment._id});
    }
  }
};
</script>

<style>
</style>
