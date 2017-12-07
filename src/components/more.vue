<!-- 发现 -->
<template id="findMore">
	<div>
		<div>
			<router-link
				class="friendsbus"
				:to="'wait'"
				v-for="(list,index) in lists"
				:key="index"
			>
				<img :src="list.img" width="35" height="35" class="borderra">
				<span>{{list.ID}}</span>
			</router-link>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default({
		name: 'more',
		data: function (argument) {
			// body...
			return {
				lists: findMsg
			}
		},
		mounted () {
			this.$store.commit('appear')
		}
	})
</script>

<style type="text/css">
	.friendsbus {
	background: #fff;
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: start;
	    -ms-flex-pack: start;
	        justify-content: flex-start;
	-webkit-box-align: center;
	    -ms-flex-align: center;
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