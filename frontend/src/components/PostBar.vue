<template>
  <section>
    <div class="post-bar-container">
      <img src="../images/clap.svg" class="like-btn" @click="addLike">
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
  methods: {
    addLike() {
      this.$emit('addLike', this.post)
    }
  },
};
</script>

<style>
</style>
