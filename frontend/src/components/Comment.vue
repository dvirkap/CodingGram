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
      console.log('start removing', this.comment.txt ,this.comment.creator._id);  
      this.$store.dispatch('deleteComment', {commentId: this.comment.creator._id});
    }
  }
};
</script>

<style>
</style>
