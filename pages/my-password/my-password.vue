<template>
	<view>
		<input class="uni-input" type="text" placeholder="请输入旧密码"
		 v-model="oldPassword"/>
		<input class="uni-input" type="text" placeholder="请输入新密码" 
		v-model="newPassword"/>
		<input class="uni-input" type="text" placeholder="请输入确认密码"
		 v-model="reNewPassword" />
		<button-com :text="buttonText" :disabled="disabled"
		@click="submit()"></button-com>
	</view>
</template>

<script>
	import buttonCom from '@/components/common/button-com.vue';
	export default {
		components: {
			buttonCom
		},
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				reNewPassword: "",
				buttonText: "完成"
			}
		},
		computed: {
			//监听输入框是否全部有内容
			disabled() {
				return this.oldPassword === "" || this.newPassword === "" || this.reNewPassword === "";
			},
			//校验两次密码是否相同
			passwordIsSame(){
				return this.newPassword === this.reNewPassword;
			}
		},
		methods: {
			submit(){
				if(!this.passwordIsSame) {
					uni.showToast({
						title: "两次密码不一致",
						icon: "none"
					})
					return
				}
				console.log('提交');
			}
		}
	}
</script>

<style>

</style>
