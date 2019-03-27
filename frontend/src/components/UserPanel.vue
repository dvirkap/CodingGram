<template>
  <div>
    <div class="left-aside-cont">
      <div class="left-aside-nav">
        <div class="left-aside-nav-icons-cont">
          <div class="left-aside-nav-cont">
            <div class="aside-cont-title">
              <div class="aside-cont-title-ps">
                <img
                  src="https://www.designskilz.com/random-users/images/imageM7.jpg"
                  class="aside-user-img"
                >
                <p class="left-aside-cont-title-ps-username">User_Name</p>
              <div class="left-userbar-addpost">
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
              <!-- <div class="post-title-tag"> -->
            </div>
            <div class="left-aside-cards-cont">
              <div
                @mouseover="showText1=true"
                @mouseout="showText1=false"
                class="left-aside-card-cont">
                <h1></h1>
                <p v-if="showText2"></p>
              </div>
              <div
                @mouseover="showText2=true"
                @mouseout="showText2=false"
                class="left-aside-card-cont">
                <p v-if="showText2"></p>
              </div>
            </div>
          </div>
          <div class="left-aside-nav-panel">
            <div @click="toggleMenu" class="left-aside-nav-btn" v-if="OpenLeftNavBtn">☰</div>
            <div @click="toggleMenu" class="left-aside-nav-btn" v-if="closeLeftNavBtn">✖</div>
            <img src="../images/envelope.svg" @mouseover="openSecNav" @mouseout="closeSecNav">
            <img src="../images/envelope.svg">
            <img src="../images/envelope.svg">
            <img src="../images/envelope.svg">
            <img src="../images/envelope.svg">
          </div>
        </div>
      </div>
    </div>

    <div v-if="SecNav" class="open-sec-nav">

    </div>

  </div>
</template>

<script>
export default {
  name: "UserPanel",
  data() {
    return {
      showText1: false,
      showText2: false,
      closeLeftNavBtn: false,
      OpenLeftNavBtn: true,
      SecNav: false
    };
  },
  methods: {
    toggleMenu() {
      this.closeLeftNavBtn = !this.closeLeftNavBtn;
      this.OpenLeftNavBtn = !this.OpenLeftNavBtn;
      document.body.classList.toggle("open-left");
    },
    openSecNav() {
        this.SecNav = true;
        document.body.classList.toggle("open-sec-nav");        
    },
    closeSecNav() {
        this.SecNav = false;
        document.body.classList.toggle("open-sec-nav");
    }
  }
};
</script>

<style scoped>

.add-post {
    margin-left: 90px;
    color: white;
}

.left-aside-cont {
  display: flex;
  flex-direction: row;
  top: 10px;
}

.left-aside-nav-cont {
  display: flex;
  flex-direction: column;
  background-color: #494949;
}

.left-aside-nav-icons-cont {
  display: flex;
  flex-direction: row;
}

.left-aside-cont-title {
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 10px;
  margin-left: 5px;
  justify-content: space-between;
}

.left-aside-cont-title img {
  align-self: center;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
}

.left-aside-cont-title-ps {
  display: flex;
  align-self: center;
  margin-left: 20px;
}

.left-aside-cont-title-ps p {
  margin: 0;
}

.left-aside-cont-title-ps-username {
  color: white;
  text-transform: lowercase;
  font-family: "Proxima Bold";
  padding-left: 5px;
  padding-bottom: 2px;
  align-self: center;
}

.left-aside-cont-title-ps-displayname {
  font-family: "Proxima";
  color: #494949;
}

.left-aside-cont-activitis {
  border-radius: 5px;
  width: 95%;
  height: 50%;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
}

.left-aside-cards-cont {
  display: flex;
  flex-direction: column;
  height: 535px;
}

.left-aside-card-cont {
  background-color: white;
  width: 300px;
  height: 80px;
  border: 1px solid #dbdbdb;
  margin: 10px;
  transition: 0.4s;
  border-radius: 5px;
  text-align: center;
}

.left-aside-card-cont:hover {
  background-color: blue;
}

.left-aside-card-cont img {
  height: 70%;
  width: 70%;
  margin: 10px;
}

.left-aside-user-img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.left-aside-nav {
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(-325px, 0);
  transition: transform 0.6s;
  margin-top: 50px;
}

.left-aside-nav-panel {
  background-color: rgb(48, 48, 48);
  width: 60px;
  height: -webkit-fill-available;
  z-index: 1;
}

.left-aside-nav-panel img {
    margin: 15px;
}

.left-aside-nav-btn {
    color: white;
    margin: 15px;
    font-size: 2rem;
}

.left-aside-nav-btn:hover {
  cursor: pointer;
}

body.open-left .left-aside-nav {
  transform: translate(0, 0);
}

body.open-left .screen {
  visibility: visible;
  opacity: 0.5;
}
</style>
