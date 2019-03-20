<template>
    <div>
        <h2>Post List</h2>
        <PostContainer></PostContainer>
    </div>
</template>

<script>
import PostContainer from './PostContainer.vue'

export default {
name: "PostList",
components: {
    PostContainer,
  },
}
</script>

<style>

</style>
