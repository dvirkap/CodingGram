<template>
  <section>
    <div class="post">
      <div class="post-title">
        <div class="post-title-info">
          <img src="https://www.designskilz.com/random-users/images/imageM7.jpg" alt>
          <p>User Name</p>
          
          <!-- <p>{{post.creator.userName}}</p> -->
        </div>
        <div class="post-title-tag">
          <p>ALERT BUTTON</p>
          <!-- <p>{{post.title}}</p> -->
          <p>
            <span class="hashtag">BUTTON/ALERT</span>
          </p>
        </div>
      </div>
      <div class="post-img">
        <div class="post-editor-title">
          <div class="post-editor-title-preview">
            <i class="fa fa-eye">
              <span>&nbsp; Result</span>
            </i>
          </div>
          <div class="post-editor-title-html">
            <i class="fab fa-html5"></i>
          </div>
          <div class="post-editor-title-css">
            <i class="fab fa-css3-alt"></i>
          </div>
          <div class="post-editor-title-js">
            <i class="fab fa-js"></i>
          </div>
          <div class="post-editor-title-run">
            <i class="fa fa-code">
              <span>{{'Show Code'}}</span>
            </i>
          </div>
        </div>
        <div class="post-editor-body">
          <codemirror v-model="code" :options="cmOptions"></codemirror>
          <div class="sec-html">
            <textarea id="editorHtml"></textarea>
          </div>

          <div class="sec-css">
            <textarea id="editorCss"></textarea>
          </div>

          <div class="sec-js">
            <textarea id="editorJs"></textarea>
          </div>

          <div class="post-runner">
            <iframe class="prepre"></iframe>
          </div>
        </div>
      </div>
      <div class="post-like">
        <div class="post-like-more">
          <img src="/imgs/liked.png" alt>
          <img src="/imgs/comment.png" alt>
          <img src="/imgs/share.png" alt>
        </div>
        <div class="post-like-bookmark">
          <img src="/imgs/bookmarked.png" alt>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-dark.css";

export default {
  name: "Post",
  props: ['post'],
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
  methods: {
    // previewMode() {
    //   this.isPREVIEW = true;
    //   this.isHTML = false;
    //   this.isCSS = false;
    //   this.isJS = false;
    // },
    // htmlMode() {
    //   this.isPREVIEW = false;
    //   this.isHTML = true;
    //   this.isCSS = false;
    //   this.isJS = false;
    // },
    // cssMode() {
    //   this.isPREVIEW = false;
    //   this.isHTML = false;
    //   this.isCSS = true;
    //   this.isJS = false;
    // },
    // jsMode() {
    //   this.isPREVIEW = false;
    //   this.isHTML = false;
    //   this.isCSS = false;
    //   this.isJS = true;
    // },

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
    }
  },
  components: {
    // MonacoEditor,
    
  },
  mounted() {
    // console.log("this is current codemirror object", this.codemirror);
    // you can use this.codemirror to do something...
  }
};
</script>






 


  
