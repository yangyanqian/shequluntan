<template>
	<view class="body position-relative">
		<!-- 顶部选项卡 -->
		<scroll-view class="scroll-row border-bottom border-light position-absolute fixed-top bg-white" 
			style="height: 100rpx;" scroll-x="true" 
			:scroll-into-view="scrollInto" scroll-with-animation>
			<view class="scroll-row-item px-3 py-2" 
				v-for="(item, i) in tabBars" :key="i" :id="'tab' + i"
				:class="tabIndex === i ? 'text-main font-md font-weight-bold' : ''"
				@click="changeTab(i)">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 选项卡对应的内容 -->
		<swiper style="padding-top: 101rpx;" :duration="150" :current="tabIndex"
			@change="onSwiperChange" :style="'height: ' + scrollHeight + 'px;'">
			<swiper-item v-for="(itemAll, i) in listAll" :key="i">
				<scroll-view scroll-y="true" :style="'height: ' + scrollHeight + 'px;'"
				@scrolltolower="loadMore(i)">
					<template v-if="itemAll.tabData.length > 0">
						<!-- 列表数据 -->
						<block v-for="(item, index) in listAll[i].tabData" :key="index">
							<topic-list :item="item" :index="index"></topic-list>
						</block>
						<!-- 上拉加载提示语（加载中...、上拉加载更多、没有更多了） -->
						<load-more :loadMoreText="itemAll.loadMoreText"
						v-show="itemAll.tabData.length > 6 "></load-more>
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
				{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
				{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
				{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
			]
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				// 顶部选项卡
				tabIndex: 0,
				scrollInto: '',
				tabBars: [
					{name: '关注'},
					{name: '推荐'}, 
					{name: '体育'}, 
					{name: '热点'}, 
					{name: '财经'}, 
					{name: '娱乐'}
				],
				scrollHeight: 200,
				listAll: [],
				listItem: []
			}
		},
		//监听导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		//监听导航栏按钮的点击事件
		onNavigationBarButtonTap(){
			uni.navigateTo({url: '../add-input/add-input'})
		},
		onLoad() {
			let _this = this;
			// 设置主内容区域的高度
			uni.getSystemInfo({
				success(res){
					// console.log(res);
					//upx2px -> px转成rpx
					_this.scrollHeight = res.windowHeight - uni.upx2px(101);
				}
			})
			this.listItem = demoList;
			// 获取主内容数据
			_this.getListData();
		},
		methods: {
			getListData(){
				for(let i=0; i< this.tabBars.length; i++){
					let listItem = i >= 2 ? [] : this.listItem;
					this.listAll.push({
						tabName: this.tabBars[i].name,
						loadMoreText: '上拉加载更多',
						tabData: listItem
					})
				}
			},
			changeTab(i){
				if(this.tabIndex === i) return;
				this.tabIndex = i;
				this.scrollInto = 'tab' + i;
			}, 
			onSwiperChange(e){
				this.changeTab(e.detail.current);
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
			//关注
			follow(index){
				this.list[index].isFollow = true;
				uni.showToast({ title: '关注成功' })
			},
			//顶踩操作
			doSupport(data){
				var item = this.listAll[data.i].tabData[data.index];
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
			}
		}
	}
</script>

<style lang="scss">
.body {
	
}

</style>
