<template>
  <section>
    <div class="post-feedback" style="overflow:hidden">
      <ul>
        <li v-for="comment in comments" :key="comment._id">
          <Comment :comment="comment" :post="post"></Comment>
        </li>
      </ul>
    </div>

    <div class="post-comment">
      <div class="post-comment-input">
        <input type="text" placeholder="Enter comment" v-model="txt">
        
        <span type="submit" @click.stop.prevent="addComment()" title="Add Comment"><i class="add-comment fas fa-comment-medical"></i></span>
      </div>
    </div>
  </section>
</template>

<script>
import Comment from "./Comment.vue";
import UtilService from '@/services/UtilService.js';

export default {
  name: "CommentsList",
  // props: ['comments', 'post'],
  props: {
    comments: Array, 
    post: Object
  },
  data() {
      return {
        txt: '',
        createdAt: '',
        creator: {
          userName: '',
          commentsList: null
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
        _id: UtilService.makeId(12),
        createdAt: new Date(),
        creator: {
          userName: 'Ploni',
        }
      };
      this.post.comments.push(comment)
      console.log('comments:', this.post._id);
      this.$store.dispatch({type: 'addComment', post: this.post});
      // console.log('comment added', comment);
      console.log('comments:', this.post.comments);
    }
  },
};
</script>

<style>
</style>
