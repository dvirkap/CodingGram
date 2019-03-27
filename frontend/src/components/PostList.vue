<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <post-container 
          @addCommentCode="addCommentCode"
            @deletePost="deletePost"  
            @addComment="addComment"
            @addLike="addLike" 
            :LoggedInUser="LoggedInUser" 
            :post="post" />
      </li>
    </ul>
  </section>
</template>

<script>
import PostContainer from "@/components/PostContainer.vue";

export default {
  name: "PostList",
  props: ['posts','LoggedInUser'],
  components: {
    PostContainer
  },
  methods: {
    addComment(newCmt){
      this.$emit('addComment',newCmt);
    },
    addLike(post) {
      this.$emit('addLike', post)
    },
    deletePost(post){
      this.$emit('deletePost', post)
    },
    addCommentCode(post){
      console.log('added 3',post)
      this.$emit('addCommentCode',post)
    }

  },
};
</script>






 


  
