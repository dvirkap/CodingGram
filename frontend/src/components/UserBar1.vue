<template class="screen" @click="toggleMenu">
  <div>
   
    <div class="aside-cont">
      <div class="aside-nav">
        <div class="aside-nav-icons-cont">
          <div class="aside-nav-cont">
            <div class="aside-cont-title">
              <div class="aside-cont-title-ps">
                <img
                  src="https://www.designskilz.com/random-users/images/imageM7.jpg"
                  class="aside-user-img"
                >
                <p class="aside-cont-title-ps-username">User_Name</p>
              </div>
              <!-- <div class="post-title-tag"> -->
              <div class="userbar-addpost">
                <router-link to="/edit">
                  <span class="add-post" title="Add Post">
                    <i class="far fa-plus-square"></i>
                  </span>
                </router-link>
                <!-- <p>ALERT BUTTON</p> -->
                <!-- <p>{{post.title}}</p> -->
                <!-- <p>
            <span class="hashtag">BUTTON/ALERT</span>
                </p>-->
              </div>
            </div>
            <div class="aside-cards-cont">
              <div @mouseover="showText1=true" @mouseout="showText1=false" class="aside-card-cont">
                <h1>Top 5 Buttons</h1>
                <img src="@/images/html5-buttons.png">
                <p
                  v-if="showText1"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
              <div @mouseover="showText2=true" @mouseout="showText2=false" class="aside-card-cont">
                <h1>Top 5 Comments</h1>
                <img src="@/images/comments.png">
                <p
                  v-if="showText2"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
            </div>
            <!-- <div class="aside-cont-activitis"></div> -->
          </div>
          <div class="aside-nav-panel">
             <div @click="toggleMenu" class="aside-nav-btn" v-if="OpenNavBtn">☰</div>
    <div @click="toggleMenu" class="aside-nav-btn" v-if="closeNavBtn">✖</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBar",
  data() {
    return {
      showText1: false,
      showText2: false,
      showNav: false,
      closeNavBtn: false,
      OpenNavBtn: true
    };
  },
  methods: {
    toggleMenu() {
      this.showNav = !this.showNav;
      this.closeNavBtn = !this.closeNavBtn
      this.OpenNavBtn = !this.OpenNavBtn
      document.body.classList.toggle("open");
    }
  }
};
</script>

<style>
</style>
