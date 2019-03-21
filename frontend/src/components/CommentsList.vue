<template>
  <section>
    <div class="post-feedback">
      <ul>
        <li v-for="comment in comments" :key="comment._id"><Comment :comment="comment"></Comment></li>
      </ul>
    
    </div>

    <div class="post-comment">
      <div class="post-comment-input">
        <input type="text" placeholder="Enter comment" v-model="txt">
        <button type="submit" @click.stop.prevent="addComment()">Add comment</button>
      </div>
    </div>
  </section>
</template>

<script>
import Comment from "./Comment.vue";
import UtilService from '@/services/UtilService.js';

export default {
  name: "CommentsList",
  props: ['comments', 'post'],
  data() {
      return {
        txt: '',
        createdAt: '',
        creator: {
          userName: '',
        }
      }
  },
  
  components: {
      Comment,
  },
  created() {
  },
  methods: {
    addComment() {
      let comment = {
        txt: this.txt,
        creator: {
          userName: 'Ploni',
          _id: UtilService.makeId(8)
        }
      };
      this.post.comments.push(comment)
      console.log('comments:', this.post._id);
      this.$store.dispatch({type: 'addComment', post: this.post});
      // console.log('comment added', comment);
      console.log('comments:', this.post.comments);
    }
  }
};
</script>

<style>
</style>
