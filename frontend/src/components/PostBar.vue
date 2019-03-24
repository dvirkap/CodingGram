<template>
  <section>
    <!-- <i class="fas fa-sign-language" @click="addLike"></i> -->
    <div class="post-bar-container">
      <img src="../images/clap.svg" class="like-btn" @click="addLike">
      <div class="like-badge">
        <span>{{post.likeBy.length}}</span>
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
      this.$store.dispatch("addLike", this.post);
    }
  },
  computed: {
      getLikes() {
          return this.$store.getters.getLikes;
      }
  }
};
</script>

<style>
</style>
