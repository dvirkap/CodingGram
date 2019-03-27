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
            <span @click="openModal" class="delelte-btn" title="Show Code">
              <i class="fas fa-code"></i>
            </span>
              <span v-if="LoggedInUser" class="delelte-btn" title="Approve">
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
      <div class="replay">
        <div class="replay-title">
          <div class="cmt-txt">
            <span class="comment-user">
              <img :src="comment.creator.img">
              {{comment.creator.userName}}
            </span>
            <span class="comment-txt-time">17 HOURS AGO</span>
          </div>
          <div class="cmt-action">
            <span
              v-if="LoggedInUser && LoggedInUser._id == comment.creator._id"
              class="delelte-btn"
              title="Edit"
            >
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
        <div class="replay-body">
          sdfasdfasdf
          sdfasdfasdfsdfasdf
          sdafsdfsdafsf
          sdfsdfasdfsdfasdfsdfsfsdfsdf
          sdafasdfsdfa dsfsdfsdfsdf fds
        </div>
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
    }
  },
  components:{


  },

};
</script>

<style>
</style>
