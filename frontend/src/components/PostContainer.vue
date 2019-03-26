<template>
  <section class="post">


    <post :post="post"/>
    <post-bar :post="post"/>
    <comments-list :user="user" :comments="post.comments" :post="post"/>
  </section>
</template>

<script>
import Post from '@/components/Post.vue'
import PostBar from '@/components/PostBar.vue'
import CommentsList from '@/components/CommentsList.vue'
// import UserService from '@/services/UserService.js'
export default {
components: {
    Post,
    PostBar,
    CommentsList,
    
},
data() {
 return {

 }
},
created() {
  // this.user = UserService.getById('5c8e97334330fca0bb034d54')   
    // console.log(this.user);
},

props: ['post','user'],
computed: {
  
    getCommentsForDisplay() {
      return this.$store.getters.getComments;
    }
  },
};
</script>

<style>
</style>
