<template>
  <div class="login">
    <div class="main-cont wrapper">
      <div class="wrapper-login">
        <div class="main-content">
          <div class="header">
            <img src="../images/loginLogi.png" alt>
          </div>
          <form @submit.prevent="signin">
            <div class="l-part">
              <div class="overlap-text">
                <input
                  type="text"
                  placeholder="Username"
                  class="input-1"
                  required
                  v-model="userCredentials.userName"
                >
                <span uk-icon="user"></span>
              </div>
              <div class="overlap-text">
                <input
                  type="password"
                  placeholder="Password"
                  class="input-2"
                  required
                  v-model="userCredentials.password"
                >
                <span uk-icon="lock"></span>
              </div>
              <button class="btn-login">Log in</button>
            </div>
          </form>
        </div>
        <div class="sub-content">
          <div class="s-part">
            Don't have an account?
            <router-link to="/signup">Signup</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import UserService from "@/services/UserService.js";

export default {
  data() {
    return {
      userCredentials: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      this.$store
        .dispatch("login", this.userCredentials)
        .then(res => {
          console.log("bla bla in login page", res);
          this.$router.push("/");
        })
    }
    // showAlert(){
    //         // Use sweetalert2
    //         this.$swal('Hello Vue world!!!');
    //     }
  }
};
</script>

<style>
.wrapper-login {
  height: 50%;
  overflow: hidden;
  border: 0px solid #000;
  margin: 0px auto;
}

.main-content {
  height: 40%;
  margin: 0px auto;
  background-color: #fff;
  border: 2px solid #e6e6e6;
  padding: 40px 50px;
  margin-top: 50px;
}

.header {
  border: 0px solid #000;
}

.header img {
  margin: 0 auto;
  position: relative;
}

.input-1,
.input-2 {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 3px;
}

.overlap-text {
  position: relative;
}

.overlap-text span {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 14px;
  text-decoration: none;
  font-family: "Overpass Mono", monospace;
  letter-spacing: -1px;
}

.btn-login {
  width: 100%;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  padding: 5px 12px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
}

.sub-content {
  width: 250px;
  height: 40%;
  margin: 10px auto;
  border: 1px solid #e6e6e6;
  padding: 20px 50px;
  background-color: #fff;
}

.s-part {
  text-align: center;
  font-family: "Proxima";
}

.s-part a {
  text-decoration: none;
  cursor: pointer;
  color: #3897f0;
}

input:focus {
  background-color: #f7f7f7;
}
</style>


