<template>
  <section>
    <div class="post-bar-container">

      <i @click="addLike" class="like-btn fas fa-heart"></i>
      <i @click="addLike" class="like-btn far fa-heart"></i>
      <!-- <img src="../images/clap.svg"  class="like-btn" @click="addLike"> -->
      <!-- <img src="../images/‏‏clapFill.svg" v-if="liked" class="like-btn" @click="addLike"> -->
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
  props: ["post"],
  data() {
    return {
      liked: false,
    }
  },
  methods: {
    addLike() {
      // this.liked = true;
      this.$emit('addLike', this.post);
    }
  },
};
</script>

<style>
</style>
