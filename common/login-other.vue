<template>
	<view class="py-3 flex justify-between" style="margin: 0 120rpx">
		<view class="icon-wrap flex align-center justify-center" 
		v-for="(item, i) in providerList" :key="i"
		:style="'background-color: ' + item.bg_color + ';'"
		@click="tologin(item)">
			<text class="iconfont text-white" :class="item.icon"></text>
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				providerList: []
			}
		},
		mounted() {
            uni.getProvider({
                service: 'oauth',
                success: (result) => {
                    result.provider.map((value) => {
                        switch (value) {
                            case 'weixin':
								this.providerList.push({
									id: value,
									providerName: '微信登录',
									icon: 'icon-weixin',
									bg_color: '#2ad19b'
								})
                                break;
                            case 'qq':
								this.providerList.push({
									id: value,
									providerName: 'QQ登录',
									icon: 'icon-QQ',
									bg_color: '#2caefc'
								})
                                break;
                            case 'sinaweibo':
								this.providerList.push({
									id: value,
									providerName: '新浪微博登录',
									icon: 'icon-xinlangweibo',
									bg_color: '#ee5e5e'
								})
                                break;
							case 'xiaomi':
								break;
                        }
                    });
                },
                fail: (error) => {
					uni.showToast({
						title: "获取登录通道失败",
						icon: "none"
					})
                    console.log('获取登录通道失败', error);
                }
            });
        },
		methods: {
			tologin(provider) {
			    uni.login({
			        provider: provider.id,
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user', //支付宝小程序需设置授权类型
			        // #endif
			        success: (res) => {
			            console.log('login success:', res);
						uni.showToast({
							title: "授权登录成功",
						})
						setTimeout(() => {
							this.$emit('back');
						}, 1000)
			        },
			        fail: (err) => {
						uni.showToast({
							title: "授权登录失败",
							icon: "none"
						})
			            console.log('login fail:', err);
			        }
			    });
			}
		},
	}
</script>

<style>
</style>
