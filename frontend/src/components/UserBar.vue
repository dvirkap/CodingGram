<template class="screen" @click="toggleMenu">   
    <!-- <div class="cards-cont"> -->
            
            <div class="aside-cards-cont">
              <!-- <div @mouseover="showText1=true" @mouseout="showText1=false" class="aside-card-cont"> -->
              <div class="aside-card-cont">
                <h1></h1>
                <img src="@/images/animal2.png">
                <p
                  v-if="showText1"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
              <!-- <div @mouseover="showText2=true" @mouseout="showText2=false" class="aside-card-cont"> -->
              <div class="aside-card-cont">
                <h1></h1>
                <img src="@/images/animal1.jpg">
                <p
                  v-if="showText2"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
              <div class="aside-card-cont">
                <h1></h1>
                <img src="@/images/nature1.jpg">
                <p
                  v-if="showText2"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
              <div class="aside-card-cont">
                <h1></h1>
                <img src="@/images/nature2.jpg">
                <p
                  v-if="showText2"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
              <div class="aside-card-cont">
                <h1></h1>
                <img src="@/images/comments.png">
                <p
                  v-if="showText2"
                >5 Beautiful, Simple Button Styles With Hover Effects For Your Website</p>
              </div>
            </div>
          
    <!-- </div> -->
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
