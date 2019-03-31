<template>
  <section>

    <div class="post-feedback customScroll">
      <ul>
        <li v-for="comment in comments" :key="comment._id">
          <Comment
            class="comment-cmp"
            @approved="approved"
            @addReplay="addReplay"
            @showCommentCode="showCommentCode"
            :LoggedInUser="LoggedInUser"
            :comment="comment"
            :post="post"
            @deleteComment="deleteComment"
            @openModal="addCode"
            @likeComment="likeComment"
          />
        </li>
      </ul>
    </div>

    <div class="post-comment">
      <div v-if="LoggedInUser" class="post-comment-input">
        <input type="text" placeholder="Enter comment" v-model="comment.txt">
        <img src="../images/html-coding.svg" class="add-code-btn" @click="addCommentCode">

        <span type="submit" @click="addComment" title="Add Comment">
          <i class="add-comment fas fa-comment-medical"></i>
        </span>
        <!-- <div v-if="isAddingCode"></div> -->
      </div>
    </div>
  </section>
</template>

<script>
import Comment from "./Comment.vue";

import UtilService from "@/services/UtilService.js";

export default {
  name: "CommentsList",
  props: {
    comments: Array,
    post: Object,
    LoggedInUser: Object
  },

  data() {
    return {
      comment: {
        txt: null,
        snippet: {
          lang: "js",
          html: null,
          css: null,
          code: null
        }
      },
      isCommentWithCode: false
    };
  },

  components: {
    Comment
  },
  created() {},
  methods: {
    approved(postToUpdate){
      this.$emit('approved',postToUpdate)
    },
    addReplay(newReply){
      this.$emit('addReplay',newReply)
    },
    deleteComment(commentId, postId) {
      this.$emit("deleteComment", commentId, postId);
    },
    addComment() {
      var newComment = this.comment;
      var postId = this.post._id;
      console.log("POST ID FROM COMMENTLIST:::::::", postId);

      this.$emit("addComment", newComment, postId);
    },
    addCode() {
      // this.$emit('openModal',this.post)
    },
    addCommentCode() {
      console.log("added 1", this.post);
      this.$emit("addCommentCode", this.post);
    },
    showCommentCode(comment) {
      this.$emit("showCommentCode", comment);
    },
    likeComment(payload) {
       this.$emit("likeComment", payload);
    }
  }
};
</script>

<style>
</style>
