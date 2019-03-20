<template>
  <ul>
    <li>
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
            <div
              @click="previewMode"
              :class="{ 'active-editor-title': isPREVIEW, 'post-editor-title-preview': true }"
            >
              <i class="fa fa-eye">
                <span>&nbsp; Result</span>
              </i>
            </div>
            <div
              v-if="toggleBtns"
              @click="htmlMode"
              :class="{ 'active-editor-title-html': isHTML, 'post-editor-title-html': true }"
            >
              <i class="fab fa-html5"></i>
            </div>
            <div
              v-if="toggleBtns"
              @click="cssMode"
              :class="{ 'active-editor-title-css': isCSS, 'post-editor-title-css': true }"
            >
              <i class="fab fa-css3-alt"></i>
            </div>
            <div
              v-if="toggleBtns"
              @click="jsMode"
              :class="{ 'active-editor-title-js': isJS, 'post-editor-title-js': true }"
            >
              <i class="fab fa-js"></i>
            </div>
            <div @click="toggleBtns =!toggleBtns" class="post-editor-title-run">
              <i class="fa fa-code">
                <span>&nbsp;{{(toggleBtns)? 'Close Code' : 'Show Code'}}</span>
              </i>
            </div>
          </div>
          <div class="post-editor-body">

            <div v-show="isJS" class="sec-html">
              <textarea id="editorHtml"></textarea>
            </div>

            <div v-show="isJS" class="sec-css">
              <textarea id="editorCss"></textarea>
            </div>

            <div v-show="isJS" class="sec-js">
              <textarea id="editorJs"></textarea>
            </div>

            <div v-show="isPREVIEW" class="post-runner">
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
        <div class="post-feedback">
          <p>coment1</p>
          <p>coment1</p>
          <p>coment1</p>
        </div>

        <div class="post-comment">
          <div class="post-comment-input">
            <p>Add comment...</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';

export default {
  name: "PostList",
  props: {},
  data() {
    return {
      isPREVIEW: true,
      isHTML: true,
      isCSS: true,
      isJS: true,
      toggleBtns: false
    };
  },
  methods: {
    previewMode() {
      this.isPREVIEW = true;
      this.isHTML = false;
      this.isCSS = false;
      this.isJS = false;
    },
    htmlMode() {
      this.isPREVIEW = false;
      this.isHTML = true;
      this.isCSS = false;
      this.isJS = false;
    },
    cssMode() {
      this.isPREVIEW = false;
      this.isHTML = false;
      this.isCSS = true;
      this.isJS = false;
    },
    jsMode() {
      this.isPREVIEW = false;
      this.isHTML = false;
      this.isCSS = false;
      this.isJS = true;
    }
  },
  components: {
    // MonacoEditor,
  },
  created() {}
};
</script>






 


  
