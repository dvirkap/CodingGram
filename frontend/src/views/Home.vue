<template>
  <div>
    <comment-code
      v-if="isModal"
      :editorTheme="editorTheme"
      @closeModal="closeModal"
      :currPost="currPost"
      :currComment="currComment"
      @addComment="addComment"
    ></comment-code>

    <div class="main-cont wrapper">
      <!-- <user-panel @Logout="Logout" :LoggedInUser="LoggedInUser"></user-panel> -->
      <post-list
        :editorTheme="editorTheme"
        @approved="approved"
        @addReplay="addReplay"
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
      currComment: null
    };
  },
  components: {
    PostList,
    UserPanel,
    CommentCode
  },
  computed: {
    editorTheme() {
      return this.$store.getters.getTheme;
    },
    posts() {
      return this.$store.getters.postsFiltered;
    },
    LoggedInUser() {
      return this.$store.getters.getCurrUser;
    }
  },

  methods: {
    approved(postToUpdate) {
      this.$store.dispatch("approvedPost", postToUpdate);
    },
    setTheme(theme) {
      this.editorTheme = theme;
    },
    addReplay(newReply) {
      this.$store.dispatch("addReplay", newReply);
    },
    Logout() {
      this.$store.dispatch("Logout");
    },
    deleteComment(commentId, postId) {
      var payload = {
        commentId,
        postId
      };
      this.$store.dispatch("deleteComment", payload);
    },
    addComment(newComment, postId) {
      var payload = {
        newComment,
        postId
      };
      this.$store.dispatch("addComment", payload);
      this.isModal = false;
      this.currPost = null;
    },
    addLike(post) {
      this.$store.dispatch("addLike", post);
    },
    deletePost(post) {
      this.$store.dispatch("deletePost", post);
    },
    closeModal() {
      this.isModal = !this.isModal;
    },
    addCommentCode(post) {
      this.currPost = post;
      this.isModal = true;
    },
    showCommentCode(comment) {
      this.currComment = comment;
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
<style>
.ssss {
  z-index: 1500;
  position: absolute;
  right: 0;
}
</style>