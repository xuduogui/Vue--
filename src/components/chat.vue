<template id="chat-out">
		<div>
			<div 
				@click="toRouter(list.name)"
				v-for="(list,index) in lists"
				:key="index"
				class="chatItem"
			>
				<mt-cell-swipe
					:right="[
						{
							content: '删除',
							style: { background: 'red', color: '#fff' },
							handler: function() {
								$store.dispatch('deleteChatList',list.name)
							}
						}
					]"
				>
					<span slot="title" class="myname">{{list.name}}</span>
					<p slot="title" class="lastmsg">{{list.lastmsg}}</p>
					<img slot="icon" :src="list.img" width="40" height="40" style="float: left; margin-right: 10px;">
					<div>
						<p class="msgtime">{{list.time}}</p>
						<mt-badge size="small" v-show="true">10</mt-badge>
					</div>
				</mt-cell-swipe>
			</div>


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
			// 事件触发路由跳转
			toRouter (to) {
				// 跳转相应的to指向的页面
				this.$router.push('/chatwith/'+to)
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
.chatItem {
	border-bottom: 1px solid #eee;
}
.myname {
	font: 14px "微软雅黑" !important;
	overflow: hidden;
	height: 16px;
}
.lastmsg {
	font: 12px "微软雅黑";
	color: #666;
	overflow: hidden;
	height: 16px;
}
.msgtime {
	font: 9px "微软雅黑";
}
</style>