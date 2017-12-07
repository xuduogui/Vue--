<!-- 主页 -->
<template id="information">
	<div>
		<div>
			<router-link
				class="chatout"
				:to="'/friendsmsg/'+list.name"
				style="margin: 10px 0;border-radius: 8px;"
			>
			<div class="chatOutUser addInformation">
				<!-- 用户头像 -->
				<img :src="list.img" width="50" height="50" class="borderra">
				<!-- 用户名和账号 -->
				<div>
					<p>{{list.name}}</p>
					<span class="chatOutMsg">账号：{{list.number}}</span>
				</div>
			</div>
			
			<!-- 二维码 -->
			<img :src="list.imgtwo" width="20" height="20" style="margin-right: 10px;">		
			</router-link>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default({
		name: 'user',
		data: function (argument) {
			return {
				// list: this.$store.state.usermsg.myid
			}
		},
		computed: {
			list () {
				return this.$store.state.usermsg.myid
			}
		},
		mounted () {
			// 显示导航
			this.$store.commit('appear')
		},

	})
</script>

<style>
	.chatOutUser {
		width: 80%;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
	    -ms-flex-pack: start;
	    justify-content: flex-start;
		padding: 5px;
	}
	.chatOutUser div {
		margin-left: 15px;
		margin-top: 5px;
	}
	.chatOutMsg {
		color: #666;
		font-size: 12px;
	}
	.chatTime {
		text-align: center;
		height: 14px;
		line-height: 14px;
		margin-right: 5px;
		color: #666;
		font-size: 12px;
	}
	.chatout {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		text-decoration: none;
	}
</style>