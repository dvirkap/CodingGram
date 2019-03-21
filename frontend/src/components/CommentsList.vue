<template>
  <section>
    <div class="post-feedback">
      <ul>
        <li v-for="comment in comments" :key="comment._id"><Comment :comment="comment"></Comment></li>
      </ul>
    
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
  props: ['comments'],
  data() {
      return {
        userName: '',

      }
  },
  
  components: {
      Comment,
  },
  created() {
    	// this.$store.dispatch({ type: "loadPosts"});
  }
};
</script>

<style>
</style>
