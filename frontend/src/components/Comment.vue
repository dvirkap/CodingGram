<template>
  <section>

    <div :class="{'cmt-rate': true, 'cmt-approve': comment.isApproved}">

      <div class="tryCmt">

        <i v-if="!LoggedInUser" class="up rate fas fa-caret-up"></i>
        <i v-if="isLiked && LoggedInUser" class=" up rateBtn rate rate-un fas fa-caret-up"></i>
        <i v-if="!isLiked && LoggedInUser" @click="likeComment" class="up rateBtn rate fas fa-caret-up"></i>
        <span class="rateNumber" >{{comment.likeBy.length}}</span>
        <i v-if="!LoggedInUser" class="down rate fas fa-caret-down"></i>
        <i v-if="isLiked && LoggedInUser" @click="likeComment" class="down rateBtn rate fas fa-caret-down"></i>
        <i v-if="!isLiked && LoggedInUser" class="down rate fas fa-caret-down"></i>


      </div>






      <i
        v-if="LoggedInUser && !post.isApproved && post.creator._id === LoggedInUser._id"
        @click="setApprove()"
        class="check rateBtn fas fa-check"
      ></i>
      <i v-if="comment.isApproved" class="check is-approved fas fa-check"></i>
    </div>
    <div class="comment-container" >
      <div class="comment-txt">
        <div class="comment-txt-title">
          <div class="cmt-txt">
            <span class="comment-user">
              <img :src="comment.creator.img">
              {{comment.creator.userName}}
            </span>
            <span class="comment-txt-time">{{ comment.createdAt | moment("from", "now" ) }}</span>
          </div>
          <div class="cmt-action">
            <span
              v-if="comment.snippet.html"
              @click="showCommentCode"
              class="delelte-btn"
              title="Show Code"
            >
              <i class="fas fa-chevron-left"></i>
              <i class="fas fa-eye"></i>
              <i class="fas fa-chevron-right"></i>
            </span>
            <span
              v-if="LoggedInUser"
              @click="isReplay = !isReplay"
              class="delelte-btn"
              title="Replay"
            >
              <i class="fas fa-reply"></i>
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

      <!-- add reply! -->

      <div v-if="isReplay" class="replay">
        <div class="replay-body-input">
          <textarea v-model="newReplay.txt" placeholder="Add your comment..." class="replay-input"></textarea>
          <div class="save-replay">
            <div>
              <button @click="addReplay" class="btn-save-replay">save</button>
            </div>
          </div>
        </div>
      </div>
      <reply
        v-for="reply in comment.replies"
        :key="reply._id"
        :reply="reply"
        :LoggedInUser="LoggedInUser"
      ></reply>
    </div>
  </section>
</template>

<script>
import Reply from "./Reply.vue";

export default {
  name: "Comment",
  props: ["comment", "post", "LoggedInUser"],
  data() {
    return {
      newReplay: {
        txt: " ",
        createdAt: Date.now(),
        commentId: this.comment._id,
        postId: this.post._id,
        creator: this.LoggedInUser
      },
      isReplay: false
    };
  },
  methods: {
    addReplay() {
      var replyCopy = JSON.parse(JSON.stringify(this.newReplay));
      this.$emit("addReplay", replyCopy);
      this.isReplay = false;
      this.newReplay.txt = " ";
    },
    openModal() {
      this.$emit("openModal");
    },
    deleteComment() {
      var commentId = this.comment._id;
      var postId = this.post._id;
      this.$emit("deleteComment", commentId, postId);
    },
    showCommentCode() {
      this.$emit("showCommentCode", this.comment);
    },
    likeComment() {
      var payload = {
        postId: this.post._id,
        comment: this.comment
      };
      this.$emit("likeComment", payload);
    },
    setApprove() {
      var postToUpdate = JSON.parse(JSON.stringify(this.post));
      postToUpdate.comments.forEach(comment => {
        if (comment._id === this.comment._id) {
          postToUpdate.isApproved = true;
          comment.isApproved = true;
        }
      });
      this.$emit("approved", postToUpdate);
    }
  },
  components: {
    Reply
  },
  computed: {
    isLiked() {
      if (this.LoggedInUser && this.comment.likeBy.length) {
        return this.comment.likeBy.some(
          user => user._id === this.LoggedInUser._id
        );
      }
    }
  }
};
</script>

<style>
.save-replay {
  height: max-content;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.replay-input {
  border-radius: 5px;
  width: 100%;
  overflow: auto;
  resize: none;
}
</style>
