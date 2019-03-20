<template>
  <div>
    <h3>Post</h3>
    <PostBar></PostBar>
    <Code></Code>
    <Preview></Preview>
  </div>
</template>

<script>
import PostBar from "./PostCmps/PostBar.vue";
import Code from "./PostCmps/Code.vue";
import Preview from "./PostCmps/Preview.vue";

export default {
  name: "Post",
  components: {
    PostBar,
    Code,
    Preview
  }
};
</script>

<style>
</style>
