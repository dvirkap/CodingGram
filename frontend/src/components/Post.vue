<template>
  <section>
    <div class="post-cont">
      <div class="post-title">
        <div class="post-title-info">
          <img :src="post.creator.img">
          <p>{{post.creator.userName}}</p>
        </div>
        <p>{{post.title}}</p>
        <!-- <h6 class="post-time">{{post.createdAt}}</h6> -->
        <h6 class="post-time">15 Hours ago</h6>
      </div>

      <div class="post-img">
        <div class="post-editor-title">
          <div class="post-editor-title-preview" @click="previewMode" :class="{'post-editor-active': isPREVIEW}">
            <i class="fa fa-eye">
              <span>&nbsp; Result</span>
            </i>
          </div>
          
          <!-- <div class="post-editor-title-html" @click="htmlMode">
            <i class="fab fa-html5"></i>
          </div> -->
          <button @click="htmlMode" class="html-btn active-btnL" :class="{'post-editor-active': isHTML}">
            <h1>
              HTML
              <i class="html-btnL fab fa-html5"></i>
            </h1>
          </button>


          <!-- <div class="post-editor-title-css" @click="cssMode">
            <i class="fab fa-css3-alt"></i>
          </div> -->
          <button @click="cssMode" class="html-btn active-btnL" :class="{'post-editor-active': isCSS}">
            <h1>
              CSS
              <i class="css-btnL fab fa-css3-alt"></i>
            </h1>
          </button>


          <!-- <div class="post-editor-title-js" @click="jsMode">
            <i class="fab fa-js"></i>
          </div> -->
          <button @click="jsMode" class="html-btn active-btnL" :class="{'post-editor-active': isJS}">
            <h1>
              JS
              <i class="js-btnL fab fa-js"></i>
            </h1>
          </button>


          <div v-if="LoggedInUser && LoggedInUser._id === post.creator._id" class="post-editor-title-run">
            <router-link :to="'/edit/'+post._id">
              <i class="far fa-edit"></i>
            </router-link>
          </div>
          <div v-if="LoggedInUser && LoggedInUser._id === post.creator._id" @click="deletePost" class="post-editor-title-run">

                <i class="far fa-trash-alt"></i>

          </div>
        </div>
        <div class="post-editor-body">
          <div class="sec-html" :class="{display: !isHTML}">
            <codemirror class="sec-html" v-model="HTMLcode" :options="cmOptionsHTML"></codemirror>
          </div>

          <div class="sec-css" :class="{display: !isCSS}">
            <codemirror v-model="CSScode" :options="cmOptionsCSS"></codemirror>
          </div>

          <div class="sec-js" :class="{display: !isJS}">
            <codemirror v-model="JScode" :options="cmOptionsJS"></codemirror>
          </div>

          <div class="post-runner" :class="{display: !isPREVIEW}">
            <iframe :srcdoc="codeForPreview()" class="prepre"></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/css/css.js";
import "codemirror/addon/display/autorefresh.js";
import "codemirror/theme/base16-dark.css";

export default {
  name: "Post",
  props: ["post", "LoggedInUser"],
  data() {
    return {
      HTMLcode: this.post.snippet.html,
      CSScode: this.post.snippet.css,
      JScode: this.post.snippet.code,

      isPREVIEW: true,
      isHTML: false,
      isCSS: false,
      isJS: false,

      cmOptionsHTML: {
        tabSize: 1,
        mode: "xml",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh: true,
      },
      cmOptionsCSS: {
        tabSize: 1,
        mode: "css",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh: true,
      },
      cmOptionsJS: {
        tabSize: 1,
        mode: "javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh: true,
      }
    };
  },
  methods: {
    deletePost(){
      this.$emit('deletePost', this.post)
    },
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
    },

    codeForPreview() {
      return `<html>
    <head>
    <style>
      ${this.CSScode}
    </style>
    </head>
    <body>
    ${this.HTMLcode}
    <script>${this.JScode}<\/script>
    </body>
    </html>`;
    },
    // ---Vue code mirror methods
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
    }
  },
  created() {
  },
};
</script>
<style>
.display {
  display: none;
}
</style>






