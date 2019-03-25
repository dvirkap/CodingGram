<template>
  <div class="aside-cont">
    <div class="aside-cont-title">
      <!-- <div> -->
        <img src="https://www.designskilz.com/random-users/images/imageM7.jpg" alt>
        <div class="aside-cont-title-ps">
          <p class="aside-cont-title-ps-username">User_Name</p>
          <p class="aside-cont-title-ps-displayname">User Name full</p>
        <!-- </div> -->
      </div>
      <!-- <div class="post-title-tag"> -->
      <div class="userbar-addpost">

      <router-link to="/edit">
      
        <span class="add-post" title="Add Post"><i class="far fa-plus-square"></i></span>
      </router-link>
          <!-- <p>ALERT BUTTON</p> -->
          <!-- <p>{{post.title}}</p> -->
          <!-- <p>
            <span class="hashtag">BUTTON/ALERT</span>
          </p>-->
      </div>
    </div>
    <div class="aside-cont-activitis"></div>
  </div>
</template>

<script>
export default {
    name: "UserBar",

};
</script>

<style>
</style>
