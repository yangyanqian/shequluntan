<template>
	<view>
		<common-list :item='detailData' isDetail
		@doComment="doComment" @doShare="doShare" 
		@follow="doFollow" @doSupport="doSupport">
			<view>
				<view class="pb-1">{{detailData.content}}</view>
				<image v-for="(item, i) in detailData.images" :key="i"
				:src="item.url" mode="widthFix" class="w-100"
				@click="previewImg(i)"></image>
			</view>
		</common-list>
		<divider></divider>
		<!-- 评论区 -->
		<view class="px-2 pt-2 font font-weight-bold">最新评论 3</view>
		<view class="px-2">
			<view class="uni-comment-list" >
				<!-- <view v-if="item.fid" style="width: 60rpx;"></view> -->
				<view class="flex w-100">
					<view class="uni-comment-face">
						<image src="../../static/default.jpg" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>小猫咪</text>
						</view>
						<view class="uni-comment-content">支持国产</view>
						<view class="uni-comment-date">
							<view>两天前</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位元素 -->
		<view style="height: 100rpx;"></view>
		<!-- 底部输入框 -->
		<bottom-input @submit="submit"></bottom-input>
		<share-more ref="share" @popupIsOpenFun="popupIsOpenFun"></share-more>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue'; //底部输入框
	import shareMore from '@/components/common/share-more.vue';
	export default {
		components: {
			commonList,
			bottomInput,
			shareMore
		},
		data() {
			return {
				detailData: {
					"username": "昵称",
					"userpic": "../../static/default.jpg",
					"newstime": "2020-05-08 上午10:37",
					"isFollow": false,
					"title": "标题",
					"titlePic": "../../static/demo/banner1.jpg",
					"support": {
						"type": "support",
						"support_count": 1,
						"unsupport_count": 2
					},
					"comment_count": 2,
					"share_num": 2,
					content: "帝莎编程学院：uni-app第二季仿商城类实战项目开发、uni-app第二季仿商城类实战项目开发",
					images: [
						{url: '../../static/demo/banner1.jpg'},
						{url: '../../static/demo/banner2.jpg'},
						{url: '../../static/demo/banner3.jpg'},
						{url: '../../static/demo/demo3.jpg'},
					]
				},
				popupIsOpen: false
			}
		},
		onLoad(e) {
			//初始化数据+修改pageTit
			this.init(JSON.parse(e.detail));
		},
		//监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			this.$refs.share.open();
		},
		//监听返回事件
		onBackPress() {
			if(this.popupIsOpen){
				this.$refs.share.close();
				return true
			}
		},
		computed: {
			imagesList() {
				return this.detailData.images.map(item => {
					return item.url
				});
			}
		},
		methods: {
			init(data){
				//修改pageTit
				uni.setNavigationBarTitle({
					title: data.title  //​​动态设置当前页面的标题
				})
			},
			// 打开个人空间
			openSpace(){
				console.log('打开个人空间');
			},
			//评论
			doComment(){
				
			},
			//分享
			doShare(){
				
			},
			//关注
			doFollow(){
				this.detailData.isFollow = true;
				uni.showToast({
					title: '关注成功'
				})
			},
			//顶踩操作
			doSupport(data){
				let detailData = this.detailData;
				let msg = data.type == 'support' ? '顶' : '踩';
				//操作过-操作相同
				if(data.type == detailData.support.type) {
					uni.showToast({
						title: '你已经操作过了',
						icon: "none"
					})
					return;
				}
				if(detailData.support.type === 'support' && data.type === 'unsupport'){//已顶，现踩
					detailData.support['support_count']--;
					detailData.support['unsupport_count']++;
				}else if(detailData.support.type === 'unsupport' && data.type === 'support'){//已踩，现顶
					detailData.support['unsupport_count']--;
					detailData.support['support_count']++;
				}else if(detailData.support.type === ''){//未操作过
					detailData.support[data.type + '_count']++;
				}
				detailData.support.type = data.type; //doSupport赋值
				uni.showToast({
					title: msg
				})
			},
			//预览图片
			previewImg(i){
				uni.previewImage({
					current: i,
					urls: this.imagesList
				});
			},
			//发送评论消息
			submit(data){
				console.log(data);
			},
			//获取弹窗是否已弹出
			popupIsOpenFun(data){
				this.popupIsOpen = data;
			}
		}
	}
</script>

<style>

</style>
