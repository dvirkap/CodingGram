<template>
    <div class="PostContainer">
        <h2>Post Container </h2>
        <Post></Post>
        <comments></Comments>
    </div>
</template>

<script>
import Post from './Post.vue'
import Comments from './Comments.vue'

export default {
name: "PostContainer",
components: {
    Post,
    Comments
  }, 
}
</script>

<style>

</style>
