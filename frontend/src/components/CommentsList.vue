<template>
  <section>



    <div class="post-feedback">
      <ul>
        <li v-for="comment in comments" :key="comment._id">
        
          <Comment class="comment-cmp" @openModal="addCode" :LoggedInUser="LoggedInUser" :comment="comment" :post="post"></Comment>
        </li>
      </ul>
    </div>

    <div class="post-comment">
      <div v-if="LoggedInUser" class="post-comment-input">
        <input type="text" placeholder="Enter comment" v-model="newCommentTxt">
        <img src="../images/html-coding.svg" class="add-code-btn" @click="addCommentCode">

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

      newCommentTxt: "",
      isAddingCode: false
    };
  },

  components: {
    Comment,

  },
  created() {},
  methods: {
    addComment() {
      let comment = {
        txt: this.newCommentTxt,
        _id: UtilService.makeId(12),
        createdAt: new Date(),
        creator: {
          userName: this.LoggedInUser.userName,
          _id: this.LoggedInUser._id,
          img: this.LoggedInUser.img
        }
      };

      var postUp = JSON.parse(JSON.stringify(this.post));

      postUp.comments.push(comment);
      this.$emit("addComment", postUp);
      this.newCommentTxt = "";
    },
    addCode() {
      // this.$emit('openModal',this.post)
    },
    addCommentCode(){
      console.log('added 1',this.post)
      this.$emit('addCommentCode',this.post)
    }

  }
};
</script>

<style>
</style>
