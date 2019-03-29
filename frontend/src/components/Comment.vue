<template>
  <section>

<div :class="{'cmt-rate': true, 'cmt-approve': comment.isApproved}">
    <i v-if="!LoggedInUser" class="fas fa-chevron-up"></i>
    <i v-if="isLiked && LoggedInUser" @click="likeComment" class="rateBtn rate-un fas fa-chevron-up"></i>
    <i v-if="!isLiked && LoggedInUser" @click="likeComment" class="rateBtn fas fa-chevron-up"></i>
    {{comment.likeBy.length}}
    <i v-if="!LoggedInUser" class="fas fa-chevron-down"></i>
    <i v-if="isLiked && LoggedInUser" @click="likeComment" class="rateBtn fas fa-chevron-down"></i>
    <i v-if="!isLiked && LoggedInUser" class=" fas fa-chevron-down"></i>

<!-- <i v-if="!comment.isApproved && post.creator._id === LoggedInUser._id" @click="setApprove" class="rateBtn fas fa-check"></i>  -->
<i v-if="comment.isApproved" class="is-approved fas fa-check"></i> 






</div>
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
            <!-- <span class="delelte-btn" title="like">
              <i v-if="!LoggedInUser" class="comment-like-b far fa-heart"></i>
              <i
                v-if="isLiked && LoggedInUser"
                @click="likeComment"
                class="comment-like-btn fas fa-heart"
              ></i>
              <i
                v-if="!isLiked && LoggedInUser"
                @click="likeComment"
                class="comment-like-btn far fa-heart"
              ></i>
              <span v-if="comment.likeBy.length">{{comment.likeBy.length}}</span> -->
            <!-- </span> -->

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

            <!-- <span
              v-if="comment.snippet.html"
              @click="showCommentCode"
              class="delelte-btn"
              title="Show Code"
            >
              <i class="fas fa-code"></i>
            </span> -->

            <span
              v-if="LoggedInUser"
              @click="isReplay = !isReplay"
              class="delelte-btn"
              title="Replay"
            >
              <i class="fas fa-reply"></i>
            </span>
            <span
              v-if="LoggedInUser && LoggedInUser._id === comment.creator._id"
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
      </div>
      <div class="comment-txt-body">
        <span class="comment-body">{{comment.txt}}</span>
      </div>

      <!-- addd replayyyyy! -->

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

      <reply v-for="reply in comment.replies" 
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
        txt: "",
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
      this.$emit("addReplay", this.newReplay);
      this.newReplay = "";
      this.isReplay = false;
    },
    openModal() {
      this.$emit("openModal");
    },
    deleteComment() {
      var commentId = this.comment._id;
      console.log("commentId:", commentId);

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
    setApprove(){
      this.comment.isApproved = true;
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
