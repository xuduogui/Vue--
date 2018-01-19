<template>
	<div class="myfriendmsg">
		<!-- <button v-on="getdata"></button> -->
		<div class="headimg">
			<span>头像</span>
			<img :src="mymsg.img" width="50" height="50">
		</div>
		<div>
			<span>昵称</span>
			<span>{{mymsg.name}}</span>
		</div>
		<div>
			<span>代号</span>
			<span>{{mymsg.number}}</span>
		</div>
		<div style="height: 30px; background: transparent;"></div>
		<div>
			<span>性别</span>
			<span>{{mymsg.sex}}</span>
		</div>
		<div>
			<span>地区</span>
			<span>{{mymsg.location}}</span>
		</div>
		<div>
			<span>个性签名</span>
			<span>{{mymsg.describe}}</span>
		</div>

		<div 
			class="gochat"
			v-if="mymsg.userId != $store.state.usermsg.myid.userId && $store.state.usermsg.myid.userId != 'myid'"
		>
			<p>
				<router-link
					:to="'/chatwith/'+mymsg.userId"
				>
					发起聊天
				</router-link>
			</p>
		</div>
		<!-- 这里写一个修改资料的接口 -->
		<div
			class="gochat"
			v-if="mymsg.userId == $store.state.usermsg.myid.userId && $store.state.usermsg.myid.userId != 'myid'"
		>
			<p>
				<router-link
					to="/changeMyMsg"
				>
					修改资料
				</router-link>
			</p>
		</div>
		<!-- 登录 -->
		<div
			class="gochat"
			v-if="$store.state.usermsg.myid.userId == 'myid'"
		>
			<p>登录</p>
		</div>
	</div>
</template>

<script>
	export default ({
		name: 'friendsmsg',
		data: function (argument) {
			// body...
			return {
				mymsg: this.$store.state.usermsg.myid,
			}
		},
		mounted () {
			// 隐藏导航
			this.$store.commit('disappear')
			// 改变头部的名字
			this.$store.commit('CHANGECHATTO',this.$route.params.id)
			// 获取并关联数据
			for (let p in this.$store.state.friendsmsg) {
				// 找出好友列表中的该对象进行关联
				if (p == this.$route.params.id) {
					this.mymsg = this.$store.state.friendsmsg[p]
				}
			}
		},
	})
</script>

<style>
	.myfriendmsg div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		background: #fff;
		border-bottom: 1px solid #eee;
		/*height: ;*/
	}
	.myfriendmsg span {
		min-width: 35%;
	}
	.gochat {
		height: 100px;
		display: flex;
		justify-content: center !important;
		align-items: center !important;
	}
	.gochat p {
		display: inline-block;
		font-weight: bold;
		/* border: 2px solid #777; */
		border-radius: 10px;
		padding: 15px;
		background-color: #FFA500;
	}
	.gochat a {
		text-decoration: none;
		color: #000;
	}
</style>