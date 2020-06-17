<template>
	<view>
		<view class="border-bottom border-light-secondary px-2 flex align-center" 
		style="height: 300rpx;">
			<image src="/static/bgimg/1.jpg" mode="aspectFill"
			style="width: 180rpx; height: 180rpx; border-radius: 50%; margin-right: 60rpx;"></image>
			<view class="flex-1 px-3">
				<view class="flex justify-between">
					<view class="flex flex-column font-md font-weight-bold align-center">
						<text>1</text>
						<text>获赞</text>
					</view>
					<view class="flex flex-column font-md font-weight-bold align-center">
						<text>2</text>
						<text>关注</text>
					</view>
					<view class="flex flex-column font-md font-weight-bold align-center">
						<text>3</text>
						<text>粉丝</text>
					</view>
				</view>
				<button class="w-100 rounded mt-2 bg-main text-white" style="height: 80rpx; line-height: 80rpx;">关注</button>
			</view>
		</view>
		<view class="flex align-center" style="height: 100rpx;">
			<text class="flex justify-center flex-1" v-for="(item, i) in tabBarNav" :key="i"
			:class="tabIndex == i ? 'text-main font-md font-weight-bold' : 'text-body font'"
			@click="changeTab(i)"> {{item}} </text>
		</view>
		<scroll-view scroll-y="true" :style="'height: ' + scrollHeight + 'px;'"
		@scrolltolower="loadMore()">
			<template v-if="tabIndex == 0">
				<view class="px-3 animated fast fadeIn">
					<view class="pb-2 border-bottom border-light-secondary">
						<view class="font-md font-weight-bold py-1">账号信息</view>
						<view class="pb-1">账号年龄：12天</view>
						<view class="pb-1">账号ID：112234</view>
					</view>	
					<view class="pb-2 border-bottom border-light-secondary">
						<view class="font-md font-weight-bold py-1">个人信息</view>
						<view class="pb-1">星座：天蝎座</view>
						<view class="pb-1">职业：IT</view>
						<view class="pb-1">故乡：中国</view>
						<view class="pb-1">情感：未婚</view>
					</view>	
				</view>
			</template>
			<template v-else>
				<view class="animated fast fadeIn">
					<template v-if="demoList.data.length > 0">
						<block v-for="(item, i) in demoList.data" :key="i">
							<common-list :item="item" :index="i"
							@follow="follow" @doSupport="doSupport"></common-list>
							<divider></divider>
						</block>
					</template>
					<template v-else>
						<no-thing></no-thing>
					</template>
					<load-more :loadMoreText="demoList.loadMoreText"></load-more>
				</view>
			</template>
		</scroll-view>
		<uni-popup ref="popup" type="top">
			<view class="popup-wrap px-2">
				<view class="flex align-center justify-center py-2 border-bottom border-light-secondary"
				@click="">
					<text class="iconfont icon-kulian text-light-black mr-2"></text>
					<text>加入黑名单</text>
				</view>
				<view class="flex align-center justify-center py-2 border-bottom border-light-secondary"
				@click="">
					<text class="iconfont icon-icon_xiaolian-mian text-light-black mr-2"></text>
					<text>聊天</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var demoList = {
		loadMoreText: "上拉加载更多",
		data: [
			{
				username: '昵称',
				userpic: '../../static/default.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '../../static/demo/banner1.jpg',
				support: {
					type: 'support',
					support_count: 1,
					unsupport_count: 2
				},
				comment_count: 2,
				share_num: 2
			},
			{
				username: '昵称2',
				userpic: '../../static/default.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '',
				support: {
					type: 'unsupport',
					support_count: 1,
					unsupport_count: 2
				},
				comment_count: 2,
				share_num: 2
			},
			{
				username: '昵称2',
				userpic: '../../static/demo/demo5.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '../../static/demo/banner2.jpg',
				support: {
					type: '', //未操作
					support_count: 0,
					unsupport_count: 0
				},
				comment_count: 0,
				share_num: 0
			},
		]
	};
	var demoList2 = {
		loadMoreText: "上拉加载更多",
		data: [
			{
				username: '1111',
				userpic: '../../static/default.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '',
				support: {
					type: 'support',
					support_count: 1,
					unsupport_count: 2
				},
				comment_count: 2,
				share_num: 2
			},
			{
				username: '22222',
				userpic: '../../static/default.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '',
				support: {
					type: 'unsupport',
					support_count: 1,
					unsupport_count: 2
				},
				comment_count: 2,
				share_num: 2
			},
			{
				username: '3333',
				userpic: '../../static/demo/demo5.jpg',
				newstime: '2020-05-08',
				isFollow: false,
				title: '标题',
				titlePic: '../../static/demo/banner2.jpg',
				support: {
					type: '', //未操作
					support_count: 0,
					unsupport_count: 0
				},
				comment_count: 0,
				share_num: 0
			},
		]
	};
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup
		},
		data() {
			return {
				tabIndex: 0,
				tabBarNav: ["主页", "帖子", "动态"],
				scrollHeight: 200,
				demoList: demoList,
				popupIsOpen: false
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = res.windowHeight - uni.upx2px(401);
				}
			})
		},
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
			this.popupIsOpen = true
		},
		onBackPress() {
			if(this.popupIsOpen){
				this.$refs.popup.close()
				this.popupIsOpen = false
				return true
			}
		},
		methods: {
			//切换tab
			changeTab(i){
				if(this.tabIndex === i) return;
				this.tabIndex = i;
				if(this.tabIndex == 1) this.demoList = demoList;
				else if(this.tabIndex == 2) this.demoList = demoList2;
			}, 
			//关注
			follow(index){
				this.demoList.data[index].isFollow = true;
				uni.showToast({ title: '关注成功' })
			},
			//顶踩操作
			doSupport(data){
				var item = this.demoList.data[data.index];
				if(data.type == item.support.type) return;
				if(item.support.type === 'support' && data.type === 'unsupport'){
					item.support['support_count']--;
					item.support['unsupport_count']++;
				}else if(item.support.type === 'unsupport' && data.type === 'support'){
					item.support['unsupport_count']--;
					item.support['support_count']++;
				}else if(item.support.type === ''){
					item.support[data.type + '_count']++;
				}
				item.support.type = data.type;
			},
			//加载更多
			loadMore(){
				if(this.demoList.loadMoreText == '加载中...') return;
				//修改列表加载状态
				this.demoList.loadMoreText = '加载中...';
				setTimeout(() => {
					//模拟数据请求
					this.demoList.data = [...this.demoList.data, ...this.demoList.data];
					//恢复加载状态
					this.demoList.loadMoreText = '上拉加载更多';
				}, 3000)
			},
		}
	}
</script>

<style>

</style>
