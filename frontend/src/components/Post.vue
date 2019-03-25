<template>
  <section>
    <div>
      <div class="post-title">
        <div class="post-title-info">
          <img :src="'https://randomuser.me/api/portraits/thumb/men/' + post.creator.userImg">
          <!-- <img src="https://www.designskilz.com/random-users/images/imageM9.jpg" alt> -->
          <p>{{post.creator.userName}}</p>

          <!-- <p>{{post.creator.userName}}</p> -->
        </div>
        <p>{{post.title}}</p>

      </div>
      <div class="post-img">
        <div class="post-editor-title">
          <div class="post-editor-title-preview" @click="previewMode">
            <i class="fa fa-eye">
              <span>&nbsp; Result</span>
            </i>
          </div>
          <div class="post-editor-title-html" @click="htmlMode">
            <i class="fab fa-html5"></i>
          </div>
          <div class="post-editor-title-css" @click="cssMode">
            <i class="fab fa-css3-alt"></i>
          </div>
          <div class="post-editor-title-js" @click="jsMode">
            <i class="fab fa-js"></i>
          </div>
          <div class="post-editor-title-run">
            <router-link :to="'/edit/'+post._id"><i class="far fa-edit"></i></router-link>
          </div>
        </div>
        <div class="post-editor-body">
          <div class="sec-html" :class="{display: !cmOptions.isHTML}">
            <codemirror class="sec-html" v-model="HTMLcode" :options="cmOptionsHTML"></codemirror>
          </div>

          <div class="sec-css" :class="{display: !cmOptions.isCSS}">
            <codemirror v-model="CSScode" :options="cmOptionsCSS"></codemirror>
          </div>

          <div class="sec-js" :class="{display: !cmOptions.isJS}">
            <codemirror v-model="JScode" :options="cmOptionsJS"></codemirror>
          </div>

          <div class="post-runner" :class="{display: !cmOptions.isPREVIEW}">
            <iframe :srcdoc="codeForPreview()" class="prepre"></iframe>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/css/css.js";
import 'codemirror/addon/display/autorefresh.js'

// theme css
import "codemirror/theme/base16-dark.css";


export default {
  name: "Post",
  props: ['post'],
  data() {
    return {
      HTMLcode: this.post.snippet.html,
      CSScode: this.post.snippet.css,
      JScode: this.post.snippet.code,
      
      cmOptions: {
        tabSize: 1,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,


        isPREVIEW: true,
        isHTML: false,
        isCSS: false,
        isJS: false,
        toggleBtns: false,
      },
      cmOptionsHTML: {
        tabSize: 1,
        mode: "xml",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh:true,


        isPREVIEW: true,
        isHTML: false,
        isCSS: false,
        isJS: false,
        toggleBtns: false,
      },
      cmOptionsCSS: {
        tabSize: 1,
        mode: "css",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh:true,


        isPREVIEW: true,
        isHTML: false,
        isCSS: false,
        isJS: false,
        toggleBtns: false,
      },
      cmOptionsJS: {
        tabSize: 1,
        mode: "javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        readOnly: true,
        autoRefresh:true,


        isPREVIEW: true,
        isHTML: false,
        isCSS: false,
        isJS: false,
        toggleBtns: false,
      }
    };
  },
  methods: {
    previewMode() {
      this.cmOptions.isPREVIEW = true;
      this.cmOptions.isHTML = false;
      this.cmOptions.isCSS = false;
      this.cmOptions.isJS = false;
    },
    htmlMode() {
      this.cmOptions.isPREVIEW = false;
      this.cmOptions.isHTML = true;
      this.cmOptions.isCSS = false;
      this.cmOptions.isJS = false;
    },
    cssMode() {
      this.cmOptions.isPREVIEW = false;
      this.cmOptions.isHTML = false;
      this.cmOptions.isCSS = true;
      this.cmOptions.isJS = false;
    },
    jsMode() {
      this.cmOptions.isPREVIEW = false;
      this.cmOptions.isHTML = false;
      this.cmOptions.isCSS = false;
      this.cmOptions.isJS = true;
    },

    //The code Preview main function
  codeForPreview(){
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
    </html>`
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

<style>
.uk-tab {
  display: flex;
}

.display {
  display: none;
}
</style>






