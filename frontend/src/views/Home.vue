<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <NavBar></NavBar> <br>
    <HelloWorld msg="Welcome to Codingram App"/>
    <NewsFeed></NewsFeed>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import NewsFeed from '@/components/NewsFeed.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    NavBar,
    NewsFeed
  },
}
</script>
