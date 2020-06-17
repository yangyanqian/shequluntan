<template>
	<view>
		<view class="flex align-center p-2">
			<text class="flex justify-center flex-1" v-for="(item, i) in tabBarNav" :key="i"
			:class="tabIndex == i ? 'text-main font-md font-weight-bold' : 'text-body font'"
			@click="changeTab(i)">
				{{item.name}} <text class="ml-1" v-show="item.num > 0">{{item.num}}</text>
			</text>
		</view>
		<!-- 选项卡对应的列表 -->
		<swiper :duration="150" :current="tabIndex"
			@change="onSwiperChange" :style="'height: ' + scrollHeight + 'px;'">
			<swiper-item v-for="(itemAll, i) in listAll" :key="i">
				<scroll-view scroll-y="true" :style="'height: ' + scrollHeight + 'px;'"
				@scrolltolower="loadMore(i)"> 
					<template v-if="itemAll.tabData.length > 0">
						<!-- 列表数据 -->
						<block v-for="(item, index) in listAll[i].tabData" :key="index">
							<user-list :item="item" :i="index"></user-list>
						</block>
						<!-- 上拉加载提示语（加载中...、上拉加载更多、没有更多了） -->
						<load-more v-show="itemAll.tabData.length > 10" :loadMoreText="itemAll.loadMoreText"></load-more>
					</template>
					<templat v-else>
						<no-thing></no-thing>
					</templat>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var demoList = [
		{'avatar': '../../static/default.jpg', username: '倩倩', sex: 1, age: '20', isFollow: true},
		{'avatar': '../../static/default.jpg', username: '乐乐', sex: 1, age: '16', isFollow: false},
		{'avatar': '../../static/default.jpg', username: '钰豪', sex: 0, age: '21', isFollow: true},
		{'avatar': '../../static/default.jpg', username: '小黑', sex: 2, age: '18', isFollow: false},
	]
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			loadMore,
			noThing,
			userList
		},
		data() {
			return {
				tabIndex: 0,
				tabBarNav: [
					{name: '互关', num: 0},
					{name: '关注', num: 3},
					{name: '粉丝', num: 4}
				],
				tabBarList: [],
				scrollHeight: 200,
				listAll: []
			}
		},
		//监听点击输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=user'
			})
		},
		//监听‘取消’事件
		onNavigationBarButtonTap(e) {
			uni.navigateBack({
				delta: 1
			})
		},
		onLoad() {
			// 设置主内容区域的高度
			uni.getSystemInfo({
				success: res =>{
					// console.log(res);
					//upx2px -> px转成rpx
					this.scrollHeight = res.windowHeight - uni.upx2px(101);
				}
			})
			// 获取主内容数据
			this.getListData();
		},
		methods: {
			//切换tab
			changeTab(i){
				if(this.tabIndex === i) return;
				this.tabIndex = i;
			}, 
			//swiper滑动
			onSwiperChange(e){
				this.changeTab(e.detail.current);
			},
			//列表模拟数据
			getListData(){
				for(let i=0; i< this.tabBarNav.length; i++){
					let listItem = i >= 2 ? [] : demoList;
					this.listAll.push({
						tabName: this.tabBarNav[i].name,
						loadMoreText: '上拉加载更多',
						tabData: demoList
					})
				}
			},
			//加载更多
			loadMore(i){
				let listAllItem = this.listAll[i];
				if(listAllItem.loadMoreText == '加载中...') return;
				//修改列表加载状态
				listAllItem.loadMoreText = '加载中...';
				setTimeout(() => {
					//模拟数据请求
					listAllItem.tabData = [...listAllItem.tabData, ...listAllItem.tabData];
					//恢复加载状态
					listAllItem.loadMoreText = '上拉加载更多';
				}, 3000)
			},
		}
	}
</script>

<style>

</style>
