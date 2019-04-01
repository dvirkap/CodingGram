<template>

  <nav class="menu" tabindex="0">
	<div class="smartphone-menu-trigger">
<i class="fas fa-bars"></i>
          <!-- <img src="../images/logoIcon.png" alt> -->


  </div>
  <header class="avatar">
    <!-- <img :src="comment.creator.img"> -->
<!-- {{LoggedInUser}} -->

		<img v-if="!LoggedInUser" src="../images/guest.png" />
		<img v-else :src="LoggedInUser.img" />

    <h2 v-if="!LoggedInUser" class="hello">Hello guest !</h2>
    <h2 v-else class="hello">Hello {{LoggedInUser.userName}} !</h2>

  </header>

	<ul>



    



    <li tabindex="0" class="icon-add-post"><router-link to="/edit"><span>New Post</span></router-link></li>
    <!-- <li tabindex="0" class="icon-add-question"> <span>Ask Something</span></li> -->
    <!-- <li tabindex="0" class="icon-home"><router-link to="/"><span>Home</span></router-link></li> -->
    <li v-if="!LoggedInUser" tabindex="0" class="icon-signup"><router-link to="/signup"><span>Sign Up</span></router-link></li>
    <li v-if="LoggedInUser" @click="logout" tabindex="0" class="icon-logout"><span>Logout</span></li>
    <li v-if="!LoggedInUser" tabindex="0" class="icon-login"><router-link to="/login"><span>Login</span></router-link></li>
    <!-- <li v-if="LoggedInUser" tabindex="0" class="icon-settings"><span>Settings</span></li> -->
  </ul>
  <!-- <ul> -->
           <!-- <li tabindex="0" class="icon-explore"><span>Explore</span></li>
      <ul>
        <li>New Posts</li>
        <li>Top Rated</li>
        <li>newb</li>

      </ul>
  </ul> -->

</nav>


</template>

<script>
export default {
  name: "UserPanel",
  props: ['LoggedInUser'],
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
    },
    logout(){
    this.$emit("Logout");
    }
  }
};
</script>

<style scoped>

a{
  text-decoration: none;
}

.menu {
  /* background: #5bc995; */
  height: 100vh;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;
  margin-top: 50px;
    background-color: rgb(48, 48, 48);
    color: white;
}
.menu .avatar {
  /* background: rgba(0, 0, 0, 0.1); */
  padding: 2em 0.5em;
  text-align: center;
  background-color: #494949;
  color:  white;

}
.menu .avatar img {
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #1d1d1d;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}
.menu .avatar h2 {

  font-family: 'Proxima';
  font-weight: normal;
  margin-bottom: 0;
  margin-top: 5px;

}
.menu ul {
  list-style: none;
  padding: 0.5em 0;
  margin: 0;
}
.menu ul li {
  font-family: "Proxima";
  padding: 0.5em 1em 0.5em 3em;
  font-size: 0.95em;
  font-weight: regular;
  background-repeat: no-repeat;
  background-position: left 15px center;
  background-size: auto 20px;
  transition: all 0.15s linear;
  cursor: pointer;
}
.menu ul li.icon-add-post {
  background-image: url("../images/new-message.svg"); 
}
.menu ul li.icon-home {
  background-image: url("../images/home.svg"); 
}
.menu ul li.icon-add-question {
  background-image: url("../images/help.svg");
}
.menu ul li.icon-signup {
  background-image: url("../images/add-user.svg");
}
.menu ul li.icon-logout {
  background-image: url("../images/log-out.svg");
}
.menu ul li.icon-login {
  background-image: url("../images/login.svg");
}

.menu ul li.icon-explore {
  background-image: url("../images/magnifier.svg");
}
.menu ul li.icon-settings {
  background-image: url("http://www.entypo.com/images//tools.svg");
}

.menu ul li:hover {
  /* background-color: rgba(0, 0, 0, 0.1); */
  background-color: blue;

}
.menu ul li:focus {
  outline: none;
}
@media screen and (max-width: 900px) and (min-width: 501px) {
  body {
    padding-left: 90px;
  }
  .menu {
    width: 90px;
  }
  .menu .avatar {
    padding: 0.5em;
    position: relative;
  }
  .menu .avatar img {
    width: 60px;
  }
  .menu .avatar h2 {
    font-family: 'Proxima';
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 100px;
    margin: 0;
    min-width: 200px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    transform: translate3d(-20px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu .avatar:hover h2 {
  font-family: 'Proxima';

    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
  .menu ul li {
    height: 60px;
    background-position: center center;
    background-size: 30px auto;
    position: relative;
  }
  .menu ul li span {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    top: 50%;
    left: 80px;
    transform: translate3d(-15px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu ul li span:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: -5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid rgba(0, 0, 0, 0.5);
    transform: translateY(-50%);
  }
  .menu ul li:hover span {
    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
}
@media screen and (max-width: 500px) {
  body {
    padding-left: 0;
  }
  .menu {
    width: 230px;
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
    transform: translate3d(-230px, 0, 0);
    transition: all 0.3s ease-in-out;
    margin-top: 10px;
    z-index: 20;
  }
  .menu .smartphone-menu-trigger {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 100%;
    
        background-color: #f7f7f7;
        border: 1px solid #dbdbdb;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
        color: #494949;

  }
  .menu .smartphone-menu-trigger:before,
  .menu .smartphone-menu-trigger:after {
    /* content: ''; */
    width: 50%;
    height: 2px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu .smartphone-menu-trigger:after {
    top: 55%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu ul li {
    padding: 1em 1em 1em 3em;
    font-size: 1.2em;
  }
  .menu:focus {
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6);
  }
  .menu:focus .smartphone-menu-trigger {
    pointer-events: none;
  }
}
.side-title{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: yellow;
  padding: 5px;
}
</style>
