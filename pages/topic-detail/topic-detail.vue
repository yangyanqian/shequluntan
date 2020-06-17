<template>
	<view><!-- 话题详情页 -->
		<image src="/static/demo/topicpic/1.jpeg" mode="aspectFill" 
		class="w-100" style="height: 300rpx; filter: blur(10px);"></image>
		<view class="px-2 py-1">
			<view class="flex align-center">
				<image src="/static/demo/topicpic/1.jpeg" mode="aspectFill"
		class="rounded mr-2" style="width: 150rpx; height: 150rpx; margin-top: -75rpx;"></image>
				<text class="font-md font-weight-bold">#话题名称#</text>
			</view>
			<view class="py-1">
				<text class="font text-light-black mr-2">动态: 4</text>
				<text class="font text-light-black">今日: 1</text>
			</view>
			<view class="font text-light-black">话题描述话题描述话题描述</view>
		</view>
		<divider></divider>
		<block v-for="(item, i) in newsData" :key="i">
			<view class="px-2 py-1 border-bottom flex align-center">
				<text class="iconfont icon-xiaoxi1 font text-main"></text>
				<text class="text-ellipsis flex-1 font">【{{item.label}}】{{item.text}}</text>
			</view>
		</block>
		<divider></divider>
		<view class="flex align-center p-2">
			<text class="flex justify-center flex-1" v-for="(item, i) in tabBarNav" :key="i"
			:class="tabIndex == i ? 'text-main font-md font-wei font-weight-bold' : 'text-body font'"
			@click="changeTab(i)">
				{{item}}
			</text>
		</view>
		<view>
			<template v-if="tabBarList.length > 0">
				<block v-for="(item, i) in tabBarList" :key="i">
					<common-list :item="item" :index='i'></common-list>
					<divider></divider>
				</block>
			</template>
			<template v-else>
				<no-thing></no-thing>
			</template>
			<load-more :loadMoreText="loadMoreText"></load-more>
		</view>
	</view>
</template>

<script>
	var demoList = [
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
	];
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			commonList,
			loadMore
		},
		data() {
			return {
				newsData: [
					{label: '新人必读', text: 'uni-app实战第二季商城类appuni-app实战第二季商城类app'},
					{label: '话题头条', text: 'uni-app实战第三季微信app'}
				],
				tabIndex: 0,
				tabBarNav: ['默认', '最新'],
				loadMoreText1: '上拉加载更多',
				loadMoreText2: '上拉加载更多',
				tabBarList1: [],
				tabBarList2: [],
			}
		},
		onLoad() {
			this.tabBarList1 = demoList;
		},
		//监听页面滚动到底部事件
		onReachBottom(){
			this.loadMore();
		},
		computed: {
			//列表数据
			tabBarList(){
				return this['tabBarList' + (this.tabIndex + 1)];
			},
			//加载文字计算属性
			loadMoreText(){
				return this['loadMoreText' + (this.tabIndex + 1)]
			}
		},
		methods: {
			//切换tab
			changeTab(i){
				this.tabIndex = i;
			},
			//加载更多
			loadMore(){
				var index = this.tabIndex;
				index = index + 1;
				if(this['tabBarList' + index].length >= 20 || this['tabBarList' + index].length == 0) {
					this['loadMoreText' + index] = '没有更多了';
					return 
				}
				if(this.loadMoreText == '加载中...') return
				this['loadMoreText' + index] = '加载中...'
				setTimeout(() => {
					//迭代数据
					this['tabBarList' + index] = [...this['tabBarList' + index], ...this['tabBarList' + index]]
					this['loadMoreText' + index] = '上拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style>

</style>
