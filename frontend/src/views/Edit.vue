<template>
  <div class="edit">
    <div class="main-cont-edit wrapper">
      <div class="edit-add">
        <div class="edit-input">
          <div class="edit-input-title">
            <input v-model="newPost.title" type="text" placeholder="Add Title...">
            <button @click="savePost()">
              SAVE
              <i class="fas fa-plus"></i>
            </button>
          </div>

          <div class="edit-input-desc">
            <textarea v-model="newPost.desc" placeholder="Short Desc..."></textarea>
          </div>
        </div>
        <div class="editor-btns">
          <div class="tryry">
            <button @click="htmlMode()" :class="{'html-btn': true,'active-btnL': !isHtml}">
              <h1>HTML<i class="html-btnL fab fa-html5"></i></h1>
            </button>
            <button @click="cssMode()" :class="{'html-btn': true,'active-btnL': !isCss}">
              <h1>
                CSS
                <i class="css-btnL fab fa-css3-alt"></i>
              </h1>
            </button>
            <button @click="jsMode()" :class="{'html-btn': true,'active-btnL': !isJs}">
              <h1>
                JS
                <i class="js-btnL fab fa-js"></i>
              </h1>
            </button>
          </div>
          <button class="btn-run" @click="codeForPreview()">
            <h1>
              RUN CODE
              <i class="run fas fa-play"></i>
            </h1>
          </button>
        </div>
        <div class="edit-editors">
          <div v-show="isHtml" class="html-editor">
            <codemirror v-model="newPost.snippet.html" :options="cmOptionsHTML"></codemirror>
          </div>

          <div v-show="isCss" class="css-editor">
            <codemirror v-model="newPost.snippet.css" :options="cmOptionsCSS"></codemirror>
          </div>

          <!-- <div v-show="isJs" class="js-editor" > -->
          <div v-show="isJs" class="js-editor">
            <codemirror v-model="newPost.snippet.code" :options="cmOptionsJS"></codemirror>
          </div>
        </div>

        <div class="editor-runner">
          <iframe :srcdoc="iframsrc"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/css/css.js";
import "codemirror/addon/display/autorefresh.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";

// theme css
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/eiffel.css";
import "codemirror/theme/ttcn.css";




export default {
  components: {},
  data() {
    return {
      isHtml: true,
      isCss: false,
      isJs: false,
      iframsrc: "",
      newPost: {
        title: "",
        desc: "",
        snippet: {
          html: "",
          css: "",
          code: ""
        },
        hashtags: []
      },
      cmOptionsHTML: {
        tabSize: 1,
        mode: "xml",
        theme: "ttcn",
        lineNumbers: true,
        line: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true
      },
      cmOptionsCSS: {
        tabSize: 1,
        mode: "css",
        theme: "ttcn",
        lineNumbers: true,
        line: true,
        autofocus: true,
        autoRefresh: true,
        autoCloseBrackets: true
      },
      cmOptionsJS: {
        tabSize: 1,
        mode: "javascript",
        theme: "eiffel",
        lineNumbers: true,
        line: true,
        autofocus: true,
        autoRefresh: true,
        autoCloseBrackets: true
      }
    };
  },
  methods: {
    codeForPreview() {
      var html = `<html>
    <head>
    <style>
      ${this.newPost.snippet.css}
    </style>
    </head>
    <body>
      ${this.newPost.snippet.html}
    <script>${this.newPost.snippet.code}<\/script>
    </body>
    </html>`;
      this.iframsrc = html;
    },
    htmlMode() {
      this.isHtml = true;
      this.isCss = false;
      this.isJs = false;
    },
    cssMode() {
      this.isCss = true;
      this.isHtml = false;
      this.isJs = false;
    },
    jsMode() {
      this.isJs = true;
      this.isHtml = false;
      this.isCss = false;
    },
    savePost() {
      this.$store
        .dispatch("addPost", this.newPost)
        .then(this.$router.push("/"));
    }
  },

  created() {
    var postId = this.$route.params.postId;
    if (postId) {
      this.$store.dispatch("LoadPost", postId).then(post => {
        var postToEdit = post;
        this.newPost = JSON.parse(JSON.stringify(postToEdit));
        // var formattedJSON = beautify_js(this.newPost.code, { indent_size: 2 });
        // console.log(formattedJSON,'formattedJSON')
        // var formattedXML = beautify_html(xmlText, { indent_size: 2 })
        this.codeForPreview();
      });
    }
  }
};
</script>


