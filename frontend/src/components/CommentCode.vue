<template>
  <section class="editor-modal-main" @click.self="closeModal">
    <div class="editor-modal-cont">
      <div class="editor-modal-desc">
        <button @click="closeModal" class="editor-close-btn editor-btn">✖</button>

        <h2 class="editor-modal-desc-title">Comment:</h2>
        <textarea v-if="isNewComment" class="txt-area-modal" v-model="newComment.txt"></textarea>
        <textarea v-else class="txt-area-modal" v-model="newComment.txt" readonly></textarea>
      </div>

      <div class="editor-modal-editor">
        <div class="editor-modal-editor-cont">
          <div class="editor-modal-editor-cont-title">
            <div class="editor-modal-btns">
              <button
                @click="htmlMode"
                class="html-btn active-btnL"
                :class="{'editor-modal-btn-active': isHtml}"
              >
                <h1>
                  HTML
                  <i class="html-btnL fab fa-html5"></i>
                </h1>
              </button>

              <button
                @click="cssMode"
                class="html-btn active-btnL"
                :class="{'editor-modal-btn-active': isCss}"
              >
                <h1>
                  CSS
                  <i class="css-btnL fab fa-css3-alt"></i>
                </h1>
              </button>

              <button
                @click="jsMode"
                class="html-btn active-btnL"
                :class="{'editor-modal-btn-active': isJs}"
              >
                <h1>
                  JS
                  <i class="js-btnL fab fa-js"></i>
                </h1>
              </button>
            </div>

            <div class="editor-modal-run">
              <button class="btn-run" @click="codeForPreview()">
                <h1>
                  RUN CODE
                  <i class="run fas fa-play"></i>
                </h1>
              </button>
            </div>
          </div>

          <div class="editor-modal-editor-body">
            <div class="editor-modal-editor-body-code">
              <div class="edit-editors-modal">
                <div v-show="isHtml" class="html-editor">
                  <codemirror v-model="newComment.snippet.html" :options="cmOptionsHTML"></codemirror>
                </div>

                <div v-show="isCss" class="css-editor">
                  <codemirror v-model="newComment.snippet.css" :options="cmOptionsCSS"></codemirror>
                </div>
                <div v-show="isJs" class="js-editor">
                  <codemirror v-model="newComment.snippet.code" :options="cmOptionsJS"></codemirror>
                </div>
              </div>
            </div>
            <div class="editor-modal-editor-body-runner">
              <iframe class="editor-modal-editor-body-frame" :srcdoc="iframsrc"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="editor-modal-actions">

        <button v-if="currPost" @click="addComment" class="editor-save-btn editor-btn">save</button>
        <!-- <button v-if="isNewComment" @click="addComment" class="editor-save-btn editor-btn">save</button> -->


        <!-- <button @click="closeModal">close</button> -->
        <!-- <button>like</button> -->
      </div>
    </div>
  </section>
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
  name: "CommentCode",
  props: ["currPost", "currComment","editorTheme"],
  data() {
    return {
      isNewComment: false,
      isHtml: true,
      isCss: false,
      isJs: false,
      iframsrc: "",

      newComment: {
        txt: "",
        snippet: {
          lang: "js",
          html: "",
          css: "",
          code: ""
        }
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
    closeModal() {
      this.$emit("closeModal");
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
    codeForPreview() {
      var html = `<html>
    <head>
    <style>
      ${this.newComment.snippet.css}
    </style>
    </head>
    <body>
      ${this.newComment.snippet.html}
    <script>
      ${this.newComment.snippet.code}<\/script>
    </body>
    </html>`;
      this.iframsrc = html;
    },
    addComment() {
      var postId = this.currPost._id;
      this.$emit("addComment", this.newComment, postId);
    }
  },
  created() {
    if (this.currPost) {
      this.isNewComment = true;
      this.newComment = {
        txt: "",
        snippet: {
          lang: "js",
          html: this.currPost.snippet.html,
          css: this.currPost.snippet.css,
          code: this.currPost.snippet.code
        }
      };
    } else {
      this.isNewComment = false;
      this.newComment = {
        txt: this.currComment.txt,
        snippet: {
          lang: "js",
          html: this.currComment.snippet.html,
          css: this.currComment.snippet.css,
          code: this.currComment.snippet.code
        }
      };
    }
    this.codeForPreview();
  },
    watch: {
    'editorTheme': (function(){
      console.log(this.editorTheme,'in post')
      this.setTheme(this.editorTheme)
    })
  }
};
</script>

<style>
</style>
