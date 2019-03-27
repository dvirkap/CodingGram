<template>
  <div>
    <div class="left-aside-cont">
      <div class="left-aside-nav">
        <div class="left-aside-nav-icons-cont">
          <div class="left-aside-nav-cont">
            <div class="aside-cont-title">
              <div v-if="userNav" class="aside-cont-title-ps">
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
                </div>
              </div>
            </div>
            <div class="left-aside-cards-cont">
              <div v-if="secNav1" class="left-aside-card-cont">
                <h1>secNav1</h1>
              </div>
              <div v-if="secNav2" class="left-aside-card-cont">
                <h1>secNav2</h1>
              </div>
            </div>
          </div>
          <div class="left-aside-nav-panel">
            <div @click="toggleMenu" class="left-aside-nav-btn" v-if="OpenLeftNavBtn">☰</div>
            <div @click="toggleMenu" class="left-aside-nav-btn" v-if="closeLeftNavBtn">✖</div>
            <div class="nav-panel-btn" :class="{selected: secNav1}">
              <img
                src="../images/envelope.svg"
                @click="show1"
                
              >
            </div>
            <div class="nav-panel-btn" :class="{selected: secNav2}">
              <img @click="show2" src="../images/envelope.svg">
            </div>
            <!-- <div class="nav-panel-btn">
              <img src="../images/envelope.svg">
            </div>
            <div class="nav-panel-btn">
              <img src="../images/envelope.svg">
            </div>
            <div class="nav-panel-btn">
              <img src="../images/envelope.svg">
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="secNav" class="open-sec-nav"></div> -->
  </div>
</template>

<script>
export default {
  name: "UserPanel",
  data() {
    return {
      closeLeftNavBtn: false,
      OpenLeftNavBtn: true,
      secNav: true,
      userNav: true,
      secNav1: false,
      secNav2: false,
    };
  },
  methods: {
    toggleMenu() {
      this.closeLeftNavBtn = !this.closeLeftNavBtn;
      this.OpenLeftNavBtn = !this.OpenLeftNavBtn;
      document.body.classList.toggle("open-left");
      this.secNav1= false
      this.secNav2= false
    },
    openSecNav() {
      this.secNav = true;
      document.body.classList.toggle("open-sec-nav");
    },
    closeSecNav() {
      this.secNav = false;
      document.body.classList.toggle("open-sec-nav");
      console.log('aaaaaaaaaaaaaaaaa')
    },
    show1() {
      this.closeLeftNavBtn = true;
      this.OpenLeftNavBtn = false;
      document.body.classList.add("open-left");
      this.userNav = true;
      this.secNav1 = true;
      this.secNav2 = false;
    },
    show2() {
      this.closeLeftNavBtn = true;
      this.OpenLeftNavBtn = false;
      document.body.classList.add("open-left");
      this.userNav = true;
      this.secNav1 = false;
      this.secNav2 = true;
    }
  }
};
</script>

<style scoped>
.selected {
    background-color: blue;
}

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
  min-width: 325px;;
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
  padding: 10px;
}

.left-aside-user-img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.left-aside-nav {
  display: flex;
  flex-direction: column;
  z-index: 100;
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
  cursor: pointer;
}

.nav-panel-btn:hover {
  background-color: blue;
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
