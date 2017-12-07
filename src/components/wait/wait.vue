<template>
	<div>
		<div>该功能尚未开放</div>
	</div>
</template>
<script type="text/javascript">
	export default ({
		name: 'wait',
		data: function (argument) {
			// body...
			return {

			}
		},
		mounted () {
			this.$store.commit('disappear')
		}
	})
</script>