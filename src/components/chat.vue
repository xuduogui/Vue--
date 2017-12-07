<template id="chat-out">
		<div>
			<router-link
				class="chatout"
				:to="'/chatwith/'+list.name"
				v-for="(list,index) in lists"
				:key="index"
				v-if="$store.state.isappear"
			>
				<div class="chatOutUser">
					<!-- 用户头像 -->
					<img :src="list.img" width="40" height="40" class="borderra">
					<!-- 用户名和上一条聊天记录 -->
					<div>
						<p>{{list.name}}</p>
						<p class="chatOutMsg">{{list.lastmsg}}</p>
					</div>
				</div>
				
				<!-- 时间戳 -->
				<p class="chatTime">{{list.time}}</p>
				<div class="deleteSpan" @click.stop="$store.commit('DELETELIST',list.name)">
					X
				</div>
			</router-link>
			<p v-if="isEmpty(lists)">你的消息空空如也</p>

			<button @click="$store.commit('DELETELIST','我的名字')">测试</button>
		</div>
</template>

<script>
	export default({
		name: 'chat',
		computed: {
			lists () {
				return this.$store.state.list
			}
		},
		mounted: function (argument) {
			// 挂载后显示导航和聊天栏
			this.$store.commit('appear')
		},
		
		methods: {
			// 检测对象是否为空
			isEmpty(obj) {
			    for (var name in obj) 
			    {
			        return false;
			    }
			    return true;
			},
			// 这是测试
			// testone () {
			// 	var _msg = {
			// 		data: {
			// 			data: {
			// 				chatcontent: [
			// 					{
			// 						"send_id": "dfsdfsdfsdf",
			// 						"receive_id": "nulldfdf",
			// 						"msg": "33333333333333333",
			// 						"date": "11:44",
			// 					},
			// 					{
			// 						"send_id": "nulldfdf",
			// 						"receive_id": "dfsdfsdfsdf",
			// 						"msg": "fsdfdfsdf",
			// 						"date": "11:54",
			// 					}
			// 				]
			// 			}
			// 		}
					
			// 	}
			// 	this.$store.commit('GETCHATCONTENT',_msg)
			// }
		}
	})
</script>

<style type="text/css">
	/*聊天栏目入口*/
.chatout {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	border-bottom: 1px solid #ddd;
	text-decoration: none;
	font-size: 13px;
	color: #000;
	position: relative;
}
.chatOutUser {
	width: 80%;
	overflow: hidden;
	display: flex;
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
	height: 16px;
	overflow: hidden;
}
.chatTime {
	text-align: center;
	height: 14px;
	line-height: 14px;
	margin-right: 5px;
	color: #666;
	font-size: 12px;
}
.deleteSpan {
	position: absolute;
	width: 20px;
	height: 20px;
	right: 0;
	font-size: 20px;

}
</style>