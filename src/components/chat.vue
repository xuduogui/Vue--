<template id="chat-out">
		<div>
			<div 
				@click="toRouter(list.aimUserId)"
				v-for="(list,index) in lists"
				:key="index"
				class="chatItem"
			>
				<mt-cell-swipe
					:right="[{
						content: '删除',
						style: { background: 'red', color: '#fff' },
						handler: function() {
							$store.dispatch('deleteChatList',list.aimUserId)
						}
					}]"
				>
					<span slot="title" class="myname">{{list.name}}</span>
					<p slot="title" class="lastmsg">{{list.lastmsg}}</p>
					<img slot="icon" :src="list.img" width="40" height="40" style="float: left; margin-right: 10px;">
					<div>
						<p class="msgtime">{{list.time}}</p>
						<mt-badge size="small" v-show="list.num > 0">{{list.num}}</mt-badge>
					</div>
				</mt-cell-swipe>
			</div>


			<p v-if="isEmpty(lists)">你的消息空空如也</p>
			<!-- <button @click="$store.commit('DELETELIST','我的名字')">测试</button>
			<button @click="$store.dispatch('isMyTest')">测试</button> -->
			<!-- <button @click="testone()">测试聊天记录</button> -->
			<!-- <button @click="testTwo()">测试初次加载</button> -->
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
			testone () {
				var _msg = {
					data: {
						data: {
							chatContent: [
								{
									"send_id": "333333333333",
									"receive_id": "4444444444444",
									"msg": "33333333333333333",
									"date": "11:44",
								},
								{
									"send_id": "4444444444444",
									"receive_id": "333333333333",
									"msg": "fsdfdfsdf",
									"date": "11:54",
								}
							]
						}
					}
					
				}
				this.$store.commit('GETCHATCONTENT',_msg)
			},
			testTwo () {
				var _msg = {
					data: {
						data: {
							friendsList: {'333333333333': {
											"userId": "333333333333",
											'name': '许多鬼',
											'img': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2981322449,3391128927&fm=27&gp=0.jpg',
											'imgtwo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2976782369,217827492&fm=27&gp=0.jpg',
											'number': '333333333333',
											'describe': '我叫许多鬼，来自中国,这里做个标识',
											'sex': '男',
											'location': '中国',
											'num': 0,
										},
										'4444444444444': {
											'name': '我的名字',
											'img': 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2800022439,3896712026&fm=27&gp=0.jpg',
											'imgtwo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2976782369,217827492&fm=27&gp=0.jpg',
											'number': '1234567865433',
											'describe': '我叫许多许多鬼，来自地球',
											'sex': '男',
											'location': '中国',
											"userId": "4444444444444",
											'num': 0,
											// 'lastmsg': '这是最后一次聊天的内容',
											// 'time': '88:99',
										},
										'三大股东': {
											'name': '三大股东',
											'img': 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3843469615,2023233766&fm=27&gp=0.jpg',
											'imgtwo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2976782369,217827492&fm=27&gp=0.jpg',
											'number': '352345645645',
											'describe': '我叫许多鬼，来自中国',
											'sex': '男',
											'location': '中国',
											"userId": "三大股东",
											'num': 5,
											// 'lastmsg': '这是最后一次聊天的内容kkk',
											// 'time': '00:99',
										},
										'44444444444': {
											'name': '如果',
											'img': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1633698864,662530431&fm=27&gp=0.jpg',
											'imgtwo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2976782369,217827492&fm=27&gp=0.jpg',
											'number': '63457345234523',
											'describe': '我叫没有鬼，来自火星sdkjfoas;djfoasdjfasdjf阿里肯定就发动反击阿喀琉斯',
											'sex': '男',
											'location': '中国',
											"userId": "44444444444",
											'num': 0,
											// 'lastmsg': '这到底是不是最后一次聊天的内容',
											// 'time': '44:33',
										},},
							"chatList": {}
						}
					}
					
				}
				this.$store.commit('GETFRIENDSDATA',_msg)
			},
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