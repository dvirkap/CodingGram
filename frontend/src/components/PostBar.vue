<template>
  <section>
    <div class="post-bar-container">
      <i v-if="!LoggedInUser" class="like-btn far fa-heart"></i>   
      <i v-if="isLiked && LoggedInUser" @click="addLike" class="like-btn fas fa-heart"></i>
      <i v-if="!isLiked && LoggedInUser" @click="addLike" class="like-btn far fa-heart"></i>

      <div class="like-badge">
        <span v-if="post.likeBy.length" class="post-likes">{{post.likeBy.length}}</span>
        <span v-else class="post-likes">Be the First</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PostBar",
  props: ["post","LoggedInUser"],
  data() {
    return {
      liked: false,
    }
  },
  methods: {
    addLike() {
      this.$emit('addLike', this.post);
    }
  },
  computed: {
    isLiked(){
      if(this.LoggedInUser) return this.post.likeBy.some(user => user._id === this.LoggedInUser._id )
    }
  },
};
</script>

<style>
</style>
