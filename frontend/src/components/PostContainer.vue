<template>
  <section>
    <h1>PostContainer.vue</h1>
    <post/>
    <post-bar/>
    <comments-list/>
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
    CommentsList
}

};
</script>

<style>
</style>
