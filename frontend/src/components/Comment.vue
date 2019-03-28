<template>
  <section>
    <div class="comment-container">
      <div class="comment-txt">
        <div class="comment-txt-title">
          <div class="cmt-txt">
            <span class="comment-user">
              <img :src="comment.creator.img">

              {{comment.creator.userName}}
            </span>
            <span class="comment-txt-time">17 HOURS AGO</span>
          </div>
          <div class="cmt-action">
            <span class="delelte-btn" title="like">
              <i v-if="!LoggedInUser" class="far fa-heart"></i>   
              <i v-if="isLiked && LoggedInUser" @click="likeComment" class="comment-like-btn fas fa-heart"></i>
              <i v-if="!isLiked && LoggedInUser" @click="likeComment" class="comment-like-btn far fa-heart"></i>
              <span v-if="comment.likeBy.length">{{comment.likeBy.length}}</span>
            </span>

            <span v-if="comment.snippet.html" @click="showCommentCode" class="delelte-btn" title="Show Code">
              <i class="fas fa-code"></i>
            </span>
              <span v-if="LoggedInUser && post.creator._id === comment.creator._id" class="delelte-btn" title="Approve">
              <i class="far fa-check-square"></i>
            </span>
            <span v-if="LoggedInUser" class="delelte-btn" title="Replay">
              <i class="fas fa-reply"></i>
            </span>
            <span v-if="LoggedInUser && LoggedInUser._id === comment.creator._id" class="delelte-btn" title="Edit">
              <i class="far fa-edit"></i>
            </span>
            <span
              v-if="LoggedInUser && LoggedInUser._id == comment.creator._id"
              @click="deleteComment"
              class="delelte-btn"
              title="Delete Comment"
            >
              <i class="far fa-trash-alt"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="comment-txt-body">
        <span class="comment-body">{{comment.txt}}</span>
      </div>
     
    </div>
  </section>
</template>

<script>


export default {
  name: "Comment",
  props: ["comment", "post", "LoggedInUser"],
  methods: {
    openModal(){
  this.$emit('openModal')
},
    deleteComment() {
      var commentId = this.comment._id;
      console.log('commentId:', commentId);
      
      var postId = this.post._id
      this.$emit("deleteComment", commentId, postId);
    },
      showCommentCode() {
      this.$emit("showCommentCode", this.comment);
    },
    likeComment() {
      var payload = {
        postId: this.post._id,
        comment: this.comment
      }
       this.$emit("likeComment", payload);
    }
  },
  components:{


  },
  computed: {
        isLiked(){
      if(this.LoggedInUser && this.comment.likeBy.length) {
        return this.comment.likeBy.some(user => user._id === this.LoggedInUser._id )}
    }
  },

};
</script>

<style>
</style>
