<template>
  <section>
    {{comment.creator.userName}}:
    {{comment.txt}}
    <span @click="removeComment" class="delelte-btn" uk-icon="trash" title="Delete Comment"></span>
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
