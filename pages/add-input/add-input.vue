<template>
	<view class="px-2">
		<!-- 自定义导航 -->
		<uni-nav-bar left-icon="back" statusBar :shadow="false" :flexed="true" @clickLeft="clickLeft">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi ml-1"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本输入框 -->
		<textarea value="" placeholder="说一句话吧~" class="uni-textarea py-2"
			v-model="content"/>
		<!-- 上传图片 -->
		<uploadImage ref="uploadImageEl" @checkedImage="checkedImage" :list="imgArr" :isShow="imgElIsShow"></uploadImage>
		 
		<!-- 底部操作条-->
		<view class="fixed-bottom bg-white border-top flex align-center justify-center px-3" 
			style="height: 88rpx;">
			 <view class="flex-1 flex">
			 	<view class="iconfont icon-caidan font-lg footIcon flex align-center px-1 mr-2 animated faster"
					hover-class="pulse"></view>
			 	<view class="iconfont icon-huati font-lg footIcon flex align-center px-1 mr-2 animated faster"
					hover-class="pulse"></view>
			 	<view class="iconfont icon-tupian <font></font>-lg footIcon flex align-center px-1 animated faster"
					hover-class="pulse" @click="clickIcon3"></view>
			 </view>
			 <view class="bg-main text-white font-sm px-3 py-1 rounded animated faster" hover-class="pulse">发送</view>
		 </view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage from '@/components/common/upload-image.vue';
	export default {
		components: {
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content: '',
				imgArr: [],
				showToast: false
			}
		},
		/* onBackPress(e) {}, */
		onLoad(){
			uni.getStorage({
				'key': 'add-input',
				success: (res) => {
					res = JSON.parse(res.data);
					console.log(res);
					this.content = res.con; 
					this.imgArr = res.img; 
				}
			})
		},
		//监听返回
		onBackPress() {
			console.log(this.content)
			if((this.content !== '' || this.imgArr.length > 0) && !this.showToast){
				uni.showModal({
					title: '提示',
					content: '是否保存为草稿',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: (res) => {
						if (res.confirm) {
							this.store();
						}else if(res.cancel) {
							uni.removeStorage({
								key: 'add-input'
							})
						}
						uni.navigateBack({delta: 1 })
					}
				});
				this.showToast = true;
				return true;
			}
		},
		computed: {
			imgElIsShow(){
				return this.imgArr.length > 0;
			}
		},
		methods: {
			//返回事件
			clickLeft(){
				uni.navigateBack({delta: 1 });
			},
			//获取uploadImage子组件中的imgArr
			checkedImage(imgArr){
				this.imgArr = imgArr;
			},
			//将内容存储在本地
			store(){
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify({
						'con': this.content,
						'img': this.imgArr
					}),
					success: function(){
					}
				})
			},
			//点击底部操作栏的第三个icon - 添加图片
			clickIcon3(){
				this.$refs.uploadImageEl.chooseImage();
			}
		}
	}
</script>
<style>
.footIcon {
	height: 88rpx;
}
</style>
