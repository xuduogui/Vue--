<!-- 好友栏单元素 -->
<template id="friends-bus">
	<div>
		<div>
			<router-link
				class="friendsbus"
				:to="'wait'"
				v-for="list in headlists"
				:key="list.name"
			>
				<img :src="list.img" width="35" height="35" class="borderra">
				<span>{{list.msg}}</span>
			</router-link>
		</div>
		<div style="height: 20px"></div>
		<div>
			<router-link
				class="friendsbus"
				:to="'/friendsmsg/'+list.name"
				v-for="list in lists"
				:key="list.name"
				v-if="list.userId != $store.state.mycookie"
			>
				<img :src="list.img" width="35" height="35" class="borderra">
				<span>{{list.name}}</span>
			</router-link>
		</div>
		<div v-if="isEmpty(lists)">赶快打电话邀请好友吧~~</div>
		
	</div>
</template>

<script type="text/javascript">
	export default({
		name: 'friends',
		data: function (argument) {
			// body...
			return {
				// lists: this.$store.state.friendsmsg,
				headlists: friendsHead
			}
		},
		computed: {
			lists () {
				return this.$store.state.friendsmsg
			}
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
		},
		mounted: function (argument) {
			// 显示导航
			this.$store.commit('appear')
		},
	})
</script>

<style type="text/css">
	/*好友栏*/
.friendsbus {
	background: #fff;
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 5px 10px;
	text-decoration: none;

}
.friendsbus span {
	margin-left: 10px;
	font-size: 14px;
	color: #000;
}
</style>