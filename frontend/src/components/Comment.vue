<template>
  <section>
    {{comment.creator.userName}}
    {{comment.txt}}
  </section>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"]
};
</script>

<style>

</style>
