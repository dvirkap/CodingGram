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
  props: ["comment", "post"],
  methods: {
    removeComment() {
      // console.log('CHECK', this.post)
      console.log('start removing', 'comm', this.comment._id, 'post' ,this.post._id);  
      this.$store.dispatch({type: 'deleteComment',commentId: this.comment._id, postId: this.post._id} );
    }
  }

};
</script>

<style>
</style>
