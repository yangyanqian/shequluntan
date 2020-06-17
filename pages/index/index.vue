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
							<common-list :item="item" :index="index"
							@follow="follow" @doSupport="doSupport"></common-list>
							<divider></divider>
						</block>
						<!-- 上拉加载提示语（加载中...、上拉加载更多、没有更多了） -->
						<load-more :loadMoreText="itemAll.loadMoreText"></load-more>
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
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			commonList,
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
					{name: '娱乐'},
					{name: '军事'},
					{name: '历史'},
					{name: '本地'},
				],
				scrollHeight: 200,
				listAll: [],
				listItem: [
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
				}]
			}
		},
		//监听导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=post'
			})
		},
		//监听导航栏按钮的点击事件
		onNavigationBarButtonTap(){
			uni.navigateTo({url: '../add-input/add-input'})
		},
		onLoad() {
			// 设置主内容区域的高度
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res);
					//upx2px -> px转成rpx
					this.scrollHeight = res.windowHeight - uni.upx2px(101);
				}
			})
			// 获取主内容数据
			this.getListData();
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
				var item = this.listAll[0].tabData[data.index];
				//操作过-操作相同
				if(data.type == item.support.type) {
					uni.showToast({
						title: '你已经操作过了',
						icon: "none"
					})
					return;
				}
				if(item.support.type === 'support' && data.type === 'unsupport'){ //已顶，现踩
					item.support['support_count']--;
					item.support['unsupport_count']++;
				}else if(item.support.type === 'unsupport' && data.type === 'support'){//已踩，现顶
					item.support['unsupport_count']--;
					item.support['support_count']++;
				}else if(item.support.type === ''){//未操作过
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
