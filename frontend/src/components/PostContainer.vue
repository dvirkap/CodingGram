<template>
  <section>
     <!-- {{postData}} -->
    <h1>PostContainer.vue</h1>
    <post :post="post"/>
    <post-bar />
    <!-- {{post}} -->
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

};
</script>

<style>
</style>
