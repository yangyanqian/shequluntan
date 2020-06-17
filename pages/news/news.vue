<template>
	<view>
		<uni-nav-bar statusBar :fixed="true" :shadow="false" :border="false" @clickRight="clickRight">
			<view class="w-100 flex align-center justify-center">
				<view class="mx-2" 
				v-for="(item, i) in navBarArr" :key="i"
				:class="navBarIndex == i ? 'font-md font-weight-bold text-main' : 'font text-light-black'"
				@click="clickNavBar(i)">
					{{item}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon font-lg"></text>
		</uni-nav-bar>
		<!-- 内容区域 -->
		<swiper :duration="150" :style="'height: ' + scrollHeight + 'px;'"
		@change='onSwiperChange' :current="navBarIndex">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height: ' + scrollHeight + 'px;'"
				@scrolltolower="loadMore()">
					<block v-for="(item, i) in list.data" :key="i">
						<common-list :index='i' :item="item" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<load-more :loadMoreText="list.loadMoreText"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 主题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height: ' + scrollHeight + 'px;'">
					<!-- 热门分类 -->
					<hot-cate :hotCateData="hotCateData"></hot-cate>
					<view class="p-2">
						<!-- 搜索框 -->
						<view class="mb-2 flex align-center justify-center bg-light rounded" 
						style="height: 86rpx;"
						@click="openSearch()">
							<text class="iconfont icon-sousuo font text-light-black mr-2"></text>
							<text class="font text-light-black">搜索话题</text>
						</view>
						<!-- 轮播图 -->
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
							<swiper-item v-for="(item, i) in swiperImg" :key='i'>
								<view class="swiper-item">
									<image :src="item" mode="aspectFill"
									style="height: 300rpx;" class="w-100 rounded"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="px-2 pb-2">
						<view class="py-2 font-md font-weight-bold">最近更新</view>
						<block v-for="(item, i) in topicData" :key="i">
							<topic-list :item="item" :index="i"></topic-list>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var demoList = [
		{
			username: '昵称',
			userpic: '../../static/default.jpg',
			newstime: '2020-05-08',
			isFollow: true,
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
			isFollow: true,
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
			isFollow: true,
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
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import hotCate from '@/components/news/hot-cate.vue';
	import topicList from '@/components/news/topic-list.vue';
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				scrollHeight: 500,
				navBarIndex: 0,
				navBarArr: ['关注', '话题'],
				list: {
					loadMoreText: '上拉加载更多',
					data: []
				},
				hotCateData: [
					{name: '关注'}, 
					{name: '推荐'}, 
					{name: '体育'}, 
					{name: '热点'}, 
					{name: '财经'}, 
					{name: '娱乐'}
				],
				swiperImg: ['/static/demo/banner1.jpg', '/static/demo/banner2.jpg', '/static/demo/banner3.jpg'],
				topicData: [
					{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
					{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
					{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = res.windowHeight - res.statusBarHeight - 44;
				}
			})
			this.list.data = demoList;
		},
		methods: {
			clickNavBar(i){
				this.navBarIndex = i;
			},
			//点击发帖icon
			clickRight(){
				uni.navigateTo({ url: '../add-input/add-input' })
			},
			//导航列表联动
			onSwiperChange(e){
				this.navBarIndex = e.detail.current;
			},
			//加载更多
			loadMore(){
				var list = this.list;
				if(list.loadMoreText == '加载中...') return
				list.loadMoreText = '加载中...';
				setTimeout(() => {
					list.data = [...list.data, ...list.data];
					list.loadMoreText = '上拉加载更多';
				}, 3000)
			},
			//顶踩操作
			doSupport(data){
				var item = this.list.data[data.index];
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
			//打开搜索页面
			openSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic'
				})
			}
		}
	}
</script>

<style>

</style>
