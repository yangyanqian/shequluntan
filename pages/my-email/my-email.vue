<template>
	<view>
		<input class="uni-input" type="text" placeholder="请输入你要绑定的邮箱"
		 v-model="email"/>
		<input class="uni-input" type="text" placeholder="请输入密码" 
		v-model="password"/>
		<button-com :text="buttonText" :disabled="disabled" @click="submit()"></button-com>
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
				email: "",
				password: "",
				buttonText: "绑定"
			}
		},
		computed: {
			//监听输入框是否全部有内容
			disabled() {
				return this.email === "" || this.password === "";
			},
		},
		methods: {
			check(){
				let rule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if(!rule.test(this.email)){
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "none"
					})
					return false
				}
				return true
			},
			submit(){
				if(!this.check()) return
				console.log('绑定');
			}
		}
	}
</script>

<style>

</style>
