<template>
  <section>
    <div class="replay">
      <div class="replay-title">
        <div class="cmt-txt">
          <span class="comment-user">
            <img :src="reply.creator.img">
            {{reply.creator.userName}}
          </span>
          <span class="comment-txt-time">{{ reply.createdAt | moment("from", "now" ) }}</span>
        </div>

        <div class="cmt-action">


          <!-- <span class="delelte-btn" title="Show Code">
            <i class="fas fa-chevron-left"></i>
            <i class="fas fa-eye"></i>
            <i class="fas fa-chevron-right"></i>
          </span> -->

          <span
            v-if="LoggedInUser && LoggedInUser._id == reply.creator._id"
            @click="deleteReply"
            class="delelte-btn"
            title="Delete Reply"
          >
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </div>
      <div class="replay-body">{{reply.txt}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Reply",
  props: ["reply", "LoggedInUser"],

  methods: {
    openModal() {
      this.$emit("openModal");
    },
    deleteReply() {
      var replyToDelete = this.reply
      this.$store.dispatch('deleteReply', replyToDelete)
      //   var commentId = this.comment._id;
      //   console.log("commentId:", commentId);
      //   var postId = this.post._id;
      //   this.$emit("deleteComment", commentId, postId);
    },
    showCommentCode() {
      // this.$emit("showCommentCode", this.comment);
    },
    likeComment() {
      // var payload = {
      //   postId: this.post._id,
      //   comment: this.comment
      // };
      // this.$emit("likeComment", payload);
    }
  },

  computed: {
    isLiked() {
      // if (this.LoggedInUser && this.comment.likeBy.length) {
      // return this.comment.likeBy.some(
      // user => user._id === this.LoggedInUser._id
      // );
      // }
    }
  }
};
</script>

<style>
</style>
