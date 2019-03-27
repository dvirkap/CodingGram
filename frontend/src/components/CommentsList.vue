<template>
  <section>
    <div class="post-feedback">
      <ul>
        <li v-for="comment in comments" :key="comment._id">
          <Comment class="comment-cmp"
           :LoggedInUser="LoggedInUser"
            :comment="comment"
             :post="post"
              @deleteComment="deleteComment"
              ></Comment>
        </li>
      </ul>
    </div>

    <div class="post-comment">
      <div v-if="LoggedInUser" class="post-comment-input">
        <input type="text" placeholder="Enter comment" v-model="comment.txt">
        <img src="../images/html-coding.svg" class="add-code-btn" @click="addCode">

        <span type="submit" @click="addComment" title="Add Comment">
          <i class="add-comment fas fa-comment-medical"></i>
        </span>
        <div v-if="isAddingCode"></div>
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
            lang: 'js',
            html: null,
            css: null,
            code: null

          }
      },
      isAddingCode: false
    }
  },

  components: {
    Comment
  },
  created() {},
  methods: {
    deleteComment(commentId, postId) {
       this.$emit("deleteComment", commentId, postId);
    },
    addComment() {
      var newComment = this.comment
      var postId = this.post._id
      console.log('POST ID FROM COMMENTLIST:::::::', postId);
      
        this.$emit("addComment", newComment, postId );
        // this.newCommentTxt = "";
      // let comment = {
      //   txt: this.newCommentTxt,
      //   _id: UtilService.makeId(12),
      //   createdAt: new Date(),
      //   creator: {
      //     userName: this.LoggedInUser.userName,
      //     _id: this.LoggedInUser._id,
      //     img: this.LoggedInUser.img
      //   }
      // };

      // var postUp = JSON.parse(JSON.stringify(this.post));

      // postUp.comments.push(comment);
    },
    addCode() {
      console.log("add code!");
    }
  }
};
</script>

<style>
</style>
