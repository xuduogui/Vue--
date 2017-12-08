<template>
	<div class="input-box">
		<!-- <button @click="isappear">退出</button> -->
		<div
			v-for="(list,index) in lists"
			:class="{rightmsg: list.chatwith == $route.params.id, leftmsg: list.chatwith != $route.params.id}"
			class="msgbox"
			:key="index"
		>
			<div v-if="list.chatwith != $route.params.id">
				<img :src="list.hrf" alt="头像" width="30" height="30">
			</div>
			<p class="msg">{{list.msg}}</p>
			<div v-if="list.chatwith == $route.params.id">
				<img :src="list.hrf" alt="头像" width="30" height="30">
			</div>
		</div>
		<div id="btview"></div>
		<div class="text-input">
			<textarea type="text" name="myipt" @keyup.enter="input"></textarea>
			<!-- <p contenteditable="true" id="input">111</p> -->
			<input type="submit" name="myipt" @click="input">
		</div>
	</div>
</template>

<script>
	export default({
		name: 'chatwith',
		data: function (argument) {
			return {
				lists: this.$store.state.chatcontent[this.$route.params.id]
			}
		},
		mounted: function (argument) {
			// 获取cookie
            this.$store.commit('GETCOOKIE')

			// 隐藏导航
			this.$store.commit('disappear')

			// 改变头部的名字
			this.$store.commit('CHANGECHATTO',this.$route.params.id)

			// 滚动条到最低
			this.flowbutton()
			// 更新数据
			this.getDate()
		},
		beforeRouteLeave (to,from,next) {
			
			let _state = this.$store.state
			// 告诉后台聊天入口列表创建
			// 如果聊天内容为空则不创建
			if (_state.chatcontent[this.$route.params.id].length > 0 && !_state.list[this.$route.params.id]) {
				this.$store.dispatch('sendChatList',{"user_id": _state.mycookie,"friend_id": _state.friendsmsg[this.$route.params.id].userId})
				// 添加聊天好友列表
				this.$store.commit('addData',this.$route.params.id)
			}
			
			// 切出聊天界面刷新聊天栏
			this.$store.commit('CHANGELASTMSG')
			next()
		},
		methods: {
			// 发送消息
			input: function () {
				// 更新个人信息
    			this.$store.commit('CHANGEMYMSG') 
				// 更新界面
				this.lists = this.$store.state.chatcontent[this.$route.params.id]

				// 获得当前时间
				var t = new Date()
				var tt
				t.getMinutes() > 9 ? tt = t.getMinutes() : tt = "0" + t.getMinutes()
				// 设置时间格式 00:00
				var _thistime = t.getHours() + ":" +  tt
				// 发送的消息模式
				var mylist = {
						// 这里通过是否有id来判断是谁发送的消息
						'hrf': this.$store.state.usermsg.myid.img,
						'chatwith': this.$route.params.id,
						'msg': '这是我发的一条信息',
						'time': _thistime,
						'userId': this.$store.state.mycookie,
						'aimUserId': this.$store.state.friendsmsg[this.$route.params.id].userId
					}
				// 获取输入值
				var e = document.getElementsByTagName('textarea')[0]
				// 改变模式中的输入值
				mylist.msg = e.value
				// 更新数据
				if (e.value.length != 0 && e.value != '\n') {
					// 获取聊天对象的名字
					var _id = this.$route.params.id

					// 发送消息
					// 这里改变了store，隐式，存在待优化
					// 将自己发送的内容push进store
					// 这里没有及时动态加载，发送的第一条消息会推迟
					// 已经动态加载，解决了推迟信息的问题，并且没有隐式改变
					this.$store.commit('TACKCHAT',{id:_id,msg:mylist})

					// 向后台发送
					this.$store.dispatch('sendMyMsg',{"msg": mylist.msg,"userId": mylist.userId,"aimUserId": mylist.aimUserId,})

					// 清空输入框
					e.value = null;
				} else {
					e.value = null
					return
				}
				
				// 滚动条到最低
				this.flowbutton()
			},
			// 遍历聊天列表
			// 如果没有该聊天入口，在后台添加数据
			// 暂时没有及时的动态刷新
			// 已经动态刷新
			getDate: function () {
				var num = 0
				// 获取对方的名字
				var id = this.$route.params.id
				for(var p in this.$store.state.list) {
					if (p == id) {
						num++
					}
				}
				// 如果聊天列表没有，则添加，有则跳过
				if (num == 0) {
					// 添加聊天内容列表
					this.$store.commit('ADDCHATCONTENT',id)
				}
			},
			// 滚动条到最低
			flowbutton () {
				var box = document.getElementsByClassName('input-box')[0]
				var btview = document.getElementById('btview')
				box.scrollIntoView(false);
			}
		}


	})
</script>

<style>
	#btview {
		height: 40px;
	}
	.input-box {
		overflow-y: auto;
	}
	.input-box img {
		border-radius: 5px;
	}
	.rightmsg {
		display: flex;
		justify-content: flex-end;
	}
	.leftmsg {
		display: flex;
		justify-content: flex-start;
	}
	.msg {
		min-height: 30px;
		line-height: 30px;
		margin: 0 10px;
		max-width: 70%;
		background: green;
		border-radius: 4px;
		padding: 4px 10px;
		/*font-weight: bold;*/
		font-style: "黑体";
		color: #fff;
	}
	.msgbox {
		margin: 5px 0;
		padding: 0 5px;
	}
	/*.myinput {
		display: flex;
	
		
	}*/
	.text-input {
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		height: 7%;
		width: 100%;
		background: #eee;
	}
	.text-input textarea {
		margin: 10px 0 0 10px;
		border: none;
		border-bottom: 1px solid #bbb;
		width: 70%;
		background: #eee;
		height: 28px;
		line-height: 28px;
	}
	.text-input input {
		width: 40px;
		height: 30px;
		border: none;
		margin: 10px 20px 0 0;
		background: #FF8C00;
		border-radius: 5px;
	}
</style>