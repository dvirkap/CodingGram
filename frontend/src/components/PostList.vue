<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post._id"><post-container :post="post" /></li>
    </ul>
  </section>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-dark.css";
import PostContainer from "@/components/PostContainer.vue";

export default {
  name: "PostList",
  props: ['posts'],
  components: {
    // MonacoEditor,
    PostContainer
  },
  data() {
    return {
      code: "const a = 10",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true
        // isPREVIEW: true,
        // isHTML: true,
        // isCSS: true,
        // isJS: true,
        // toggleBtns: false
      }
    };
  },
  created() {
    // this.$store.dispatch({ type: "loadPosts" });
  },
  methods: {

    // ---Vue code mirror methods
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
    // posts() {
    //   return this.$store.getters.postsFiltered;
    // }
  },

  mounted() {
    // console.log("this is current codemirror object", this.codemirror);
    // you can use this.codemirror to do something...
  }
};
</script>






 


  
