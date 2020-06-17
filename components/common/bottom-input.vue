<!-- 底部输入框（发送聊天消息） -->
<template>
	<view class="fixed-bottom px-2 border-top border-light-secondary flex align-center bg-white rounded-top rounded-right"
	style="height: 88rpx;">
		<input type="text" value="" placeholder="文明发言" 
		class="flex-1 px-1 w-100" style="height: 100%;"
		v-model="content" @confirm="submit()"/>
		<text class="iconfont icon-fabu text-dark mx-2" style="font-size: 50rpx;"
		@click="submit()"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			}
		},
		methods: {
			submit() {
				if(this.content.trim().length == 0){
					return uni.showToast({
						title: "消息不能为空",
						icon: "none"
					})
				}
				this.$emit('submit', this.content);
				//清空输入框内容
				this.content = "";
			}
		},
	}
</script>

<style>
</style>
