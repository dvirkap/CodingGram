<template>
  <!-- <div class="home"> -->
<div>


      <comment-code 
        v-if="isModal"
        @closeModal="closeModal"
        :currPost="currPost"
        :currComment="currComment"
         @addComment="addComment"
        >
      </comment-code>




    <div class="main-cont wrapper">


    

      <user-panel :LoggedInUser="LoggedInUser"></user-panel>
      <post-list
        @showCommentCode="showCommentCode"
        @addCommentCode="addCommentCode"
        @deletePost="deletePost"  
        @addComment="addComment"
        @deleteComment="deleteComment"
        @addLike="addLike"
        @likeComment="likeComment"
       
        :LoggedInUser="LoggedInUser"
        :posts="posts"
        class="posts-cont"
      ></post-list>

      <!-- <UserBar></UserBar> -->
    </div>
</div>

</template>



<script>
import PostList from "../components/PostList";
import CommentCode from "../components/CommentCode";


import UserBar from "../components/UserBar.vue";
import UserPanel from "../components/UserPanel.vue";

export default {
  data() {
    return {
      isModal: false, 
      currPost: null,    
      currComment: null, 
    }
  },
  components: {
    PostList,
    // UserBar,
    UserPanel,
    CommentCode


  },
  computed: {
    posts() {
      return this.$store.getters.postsFiltered;
    },
    LoggedInUser() {
      return this.$store.getters.getCurrUser;
    }
  },
  methods: {
    deleteComment(commentId, postId) {
      var payload = {
        commentId,
        postId
      };
      this.$store.dispatch("deleteComment", payload);
    },
    addComment(newComment, postId) {
      console.log('newComment:::', newComment);
      console.log('postId:::', postId);
      
      var payload = {
        newComment,
        postId
      };
      this.$store.dispatch("addComment", payload);
      this.isModal = false 
      this.currPost = null;
      // this.currComment = null;

 

    },
    addLike(post) {
      this.$store.dispatch("addLike", post);
    },
    deletePost(post) {
      this.$store.dispatch("deletePost", post);
    },
    closeModal(){
      this.isModal = !this.isModal;
    },
    addCommentCode(post){
      this.currPost = post
      console.log('in homeee',post)
      this.isModal = true;
    },
    showCommentCode(comment){
      this.currComment = comment
      console.log('in homeee',comment)
      this.isModal = true;
    },
    likeComment(payload) {
       this.$store.dispatch("likeComment", payload);
    }

  },
  created() {
    this.$store.dispatch("loadPosts");
  }
};
</script>


