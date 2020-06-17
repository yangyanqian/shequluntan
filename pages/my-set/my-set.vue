<template>
	<view>
		<uni-list>
			<uni-list-item title="账号与安全" @click="open('my-password')"></uni-list-item>
			<uni-list-item title="绑定邮箱" @click="open('my-email')"></uni-list-item>
			<uni-list-item title="资料编辑" @click="open('my-info')"></uni-list-item>
			<uni-list-item title="清除缓存" @click="clear()">
				<text slot="right" class="text-muted">{{storage | storage_formate}}</text>
			</uni-list-item>
			<uni-list-item title="意见反馈" @click="open('my-feedback')"></uni-list-item>
			<uni-list-item title="关于社区" @click="open('about')"></uni-list-item>
		</uni-list>
		<button-com :text="buttonText"
		@click="loginOut"></button-com>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import buttonCom from '@/components/common/button-com.vue';
	export default {
		components: {
			uniList,
			uniListItem,
			buttonCom
		},
		data() {
			return {
				buttonText: "退出登录",
				storage: 0
			}
		},
		filters: {
			storage_formate(value) {
				return value > 1024 ? (value/1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB';
			}
		},
		onLoad() {
			this.getStorageInfo()
		},
		methods: {
			getStorageInfo(){
				let getStorage = uni.getStorageInfoSync()
				this.storage = getStorage.currentSize
			},
			open(path){
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			},
			//清除缓存
			clear(){
				uni.showModal({
					title: "提示",
					content: "确定清除缓存",
					cancelText: "不清除",
					confirmText: "清除",
					success: (res) => {
						// console.log(res)
						if(res.confirm){
							uni.clearStorageSync();
							this.getStorageInfo()
							uni.showToast({
								title: "清除成功",
								icon: "none"
							})
						}
					}
				})
			},
			loginOut(){
				console.log('loginOut');
			}
		}
	}
</script>

<style>

</style>
