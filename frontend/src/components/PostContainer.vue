<template>
  <section class="post">
    <post :post="post"/>
    <post-bar :post="post"/>
    <comments-list :comments="post.comments" :post="post"/>
  </section>
</template>

<script>
import Post from '@/components/Post.vue'
import PostBar from '@/components/PostBar.vue'
import CommentsList from '@/components/CommentsList.vue'
export default {
components: {
    Post,
    PostBar,
    CommentsList,
    
},
props: ['post'],
computed: {
    getCommentsForDisplay() {
      return this.$store.getters.getComments;
    }
  },
};
</script>

<style>
</style>
