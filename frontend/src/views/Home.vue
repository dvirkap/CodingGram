<template>

  <div class="home">
		<div class="main-cont wrapper">
			<post-list class="posts-cont"></post-list>

		<!-- <div class="posts-cont">
			<div class="post">
				<div class="post-title">
					<div class="post-title-info">
						<img src="https://www.designskilz.com/random-users/images/imageM7.jpg" alt="">
						<p>User Name</p>
					</div>
					<div class="post-title-tag">
						<p>30 mins ago</p>
						<p><span class="hashtag">JavaScript</span></p>
					</div>
				</div>
				<div class="post-img">
					<textarea id="editor"></textarea>
				</div>
				<div class="post-like">
					<div class="post-like-more">
						<img src="/imgs/liked.png" alt="">
						<img src="/imgs/comment.png" alt="">
						<img src="/imgs/share.png" alt="">
					</div>
					<div class="post-like-bookmark">
						<img src="/imgs/bookmarked.png" alt="">
					</div>

				</div>
				<div class="post-feedback">
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
					<p>coment1</p>
				</div>

				<div class="post-comment">
					<div class="post-comment-input">
						<p>Add comment...</p>
					</div>
				</div>
			</div>
			<div class="post">
				<div class="post-title">
					<div class="post-title-info">
						<img src="https://www.designskilz.com/random-users/images/imageM1.jpg" alt="">
						<p>User Name</p>
					</div>
					<div class="post-title-tag">
						<p>46 mins ago</p>
						<p><span class="hashtag">Html5</span></p>

					</div>
				</div>
				<div class="post-img">
						<textarea id="editor2"></textarea>

				</div>
				<div class="post-like">
					<div class="post-like-more">
						<img src="/imgs/liked.png" alt="">
						<img src="/imgs/comment.png" alt="">
						<img src="/imgs/share.png" alt="">
					</div>
					<div class="post-like-bookmark">
						<img src="/imgs/bookmark.png" alt="">
					</div>

				</div>
				<div class="post-feedback"></div>

				<div class="post-comment">
					<div class="post-comment-input">
						<p>Add comment...</p>
					</div>
				</div>
			</div>
			<div class="post">
				<div class="post-title">
					<div class="post-title-info">
						<img src="https://www.designskilz.com/random-users/images/imageM4.jpg" alt="">
						<p>User Name</p>
					</div>
					<div class="post-title-tag">
						<p>a hour ago</p>
						<p><span class="hashtag">Node.js</span></p>
					</div>
				</div>
				<div class="post-img">

				</div>
				<div class="post-like">
					<div class="post-like-more">
						<img src="/imgs/liked.png" alt="">
						<img src="/imgs/comment.png" alt="">
						<img src="/imgs/share.png" alt="">
					</div>
					<div class="post-like-bookmark">
						<img src="/imgs/bookmark.png" alt="">
					</div>

				</div>
				<div class="post-feedback"></div>

				<div class="post-comment">
					<div class="post-comment-input">
						<p>Add comment...</p>
					</div>
				</div>
			</div>
		</div> -->
			<!-- <posts-aside class="aside-cont"></posts-aside> -->

		<div class="aside-cont">
			<div class="aside-cont-title">

				<img src="https://www.designskilz.com/random-users/images/imageM7.jpg" alt="">
				<div class="aside-cont-title-ps">
					<p class="aside-cont-title-ps-username">User_Name</p>
					<p class="aside-cont-title-ps-displayname">User Name full</p>
				</div>

			</div>
			<div class="aside-cont-activitis">

			</div>
		</div> 

	</div>


  </div>
</template>



<script>
import PostList from '../components/PostList'

export default {
  components:{
PostList
  }
}
</script>


