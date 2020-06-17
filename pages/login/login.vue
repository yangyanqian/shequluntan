<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<!-- 关闭登录页icon -->
		<view class="iconfont icon-guanbi font-lg text-dark flex align-center p-3"
		@click="back"></view>
		<!-- text -->
		<view class="text-dark flex align-center justify-center" 
		style="font-size: 50rpx; padding: 80rpx 0;">{{loginPwd ? '账号密码登录' : '手机验证码登录'}}</view>
		<!-- form表单 -->
		<template v-if="loginPwd">
			<view class="mx-2">
				<view class="border-bottom border-light-secondary">
					<input type="text" placeholder="昵称/手机号/邮箱" class="flex-1" style="height: 120rpx;"
					v-model="username">
				</view>
				<view class="flex align-center border-bottom border-light-secondary">
					<input type="password" placeholder="请输入密码" class="flex-1 mr-1" style="height: 120rpx;"
					v-model="password">
					<view class="px-2 font text-light-muted" style="line-height: 120rpx;">
						忘记密码？
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="mx-2">
				<view class="flex align-center border-bottom border-light-secondary">
					<text class="px-2">+86</text>
					<input type="number" placeholder="手机号" class="flex-1" style="height: 120rpx;"
					v-model="phone">
				</view>
				<view class="flex align-center border-bottom border-light-secondary">
					<input type="number" placeholder="请输入验证码" class="flex-1 mr-1" style="height: 120rpx;"
					v-model="code">
					<view class="py-2 font rounded text-center" style="width: 200rpx"
					@click="getCode" :class="codeStatus ? 'bg-light text-light-muted' : 'bg-main text-white'">
						{{codeTime > 0 ? codeTime + ' s' : '获取验证码' }}
					</view>
				</view>
			</view>
		</template>
		<!-- 占位 -->
		<view style="height: 60rpx;"></view>
		<!-- 登录 -->
		<button-com :text="buttonText" :disabled="disabled"
		@click="submit"></button-com>
		<view class="flex align-center justify-center">
			<text class="p-2" style="color: #23586f;" @click="changeLoginType">{{loginPwd ? '验证码登录' : '账号密码登录'}}</text>
			<text class="text-muted">|</text>
			<text class="p-2" style="color: #23586f;">登录遇到问题？</text>
		</view>
		<!-- 其他账号登录 -->
		<view class="pt-2 flex align-center justify-center">
			<text class="line"></text>
			<text class="mx-2 text-light-muted">社交账号登录</text>
			<text class="line"></text>
		</view>
		<login-other @back="back"></login-other>
		<!--  -->
		<view class="pt-2 text-center">
			<text class="text-light-muted">注册即代表您同意</text>
			<text style="color: #1582f8;">《XXX社区协议》</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import buttonCom from '@/components/common/button-com.vue';
	import loginOther from '@/common/login-other.vue';
	export default {
		components: {
			uniStatusBar,
			buttonCom,
			loginOther
		},
		data() {
			return {
				loginPwd: true,
				username: "",
				password: "",
				phone: "",
				code: "",
				codeTime: 0,
				buttonText: "登录"
			}
		},
		computed: {
			disabled() {
				if(this.loginPwd && (this.username !== '' && this.password !== '')){
					return false
				}else if(!this.loginPwd && (this.phone !== '' && this.code !== '')){
					return false
				}
				return true
			},
			codeStatus() {
				return this.codeTime > 0 
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			//切换登录方式
			changeLoginType(){
				this.loginPwd = !this.loginPwd;
			},
			//校验账号和手机号
			validate(sign){
				let phone =  /^1\d{10}$/,
					userName = /^[a-zA-Z0-9_-]{3,16}$/;
				let pattern = sign == 'phone' ? phone : userName;
				if(!pattern.test(this[sign])) {
					uni.showToast({
						title: sign == 'phone' ? "手机号格式不正确" : "账号格式不正确",
						icon: "none"
					})
					return false
				}
				return true
			},
			//获取验证码
			getCode(){
				if(this.phone === ""){
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return
				}
				if(!this.validate('phone')) return
				if(this.codeTime > 0) return
				this.codeTime = 60
				let timer = setInterval(() => {
					if(this.codeTime >= 1){
						this.codeTime--
					}else {
						clearInterval(timer);
					}
				}, 1000)
				
			},
			//登录
			submit(){
				//校验账号和手机号
				if(!this.validate(this.loginPwd ? 'username' : 'phone')) return
				console.log('submit');
			}
		}
	}
</script>

<style>
.line {
	width: 100rpx;
	height: 1rpx;
	background-color: #A9A5A0;
}
</style>
