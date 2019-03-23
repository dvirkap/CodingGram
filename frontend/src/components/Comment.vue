<template>
  <section>
    {{comment.creator.userName}}:
    {{comment.txt}}
    <button @click="removeComment">delete</button>
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
