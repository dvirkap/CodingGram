<template>
  <section class="post">
     <!-- {{postData}} -->
    <h1>PostContainer.vue</h1>
    <post :post="post"/>
    <post-bar />
    <!-- {{post}} -->
    <!-- <comments-list :post="post" :comments="getCommentsForDisplay"/> -->
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
