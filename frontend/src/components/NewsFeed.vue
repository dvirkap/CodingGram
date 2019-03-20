<template>
    <div class="NewsFeed">
        <h1>News Feed</h1>
        <PostList></PostList>
        <UserBar></UserBar>
        <TopPosts></TopPosts>
        <Suggestions></Suggestions>
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import UserBar from '@/components/UserBar.vue'
import TopPosts from '@/components/TopPosts.vue'
import Suggestions from '@/components/Suggestions.vue'

export default {
name: "NewsFeed",
components: {
    PostList,
    UserBar,
    TopPosts,
    Suggestions
  },
}
</script>

<style>

</style>
