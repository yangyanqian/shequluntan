<template>
	<view>
		<template v-if="searchResult.length === 0">
			<view class="p-2">
				<view class="font-md">搜索历史</view>
					<view class="flex flex-wrap pt-1">
						<view class="border rounded font px-2 py-1 mr-2 mb-2"
						v-for="(item, i) in historyArr" :key='i'
						@click="clickSearchHistory(item.name)">{{item.text}}</view>
					</view>
			</view>
		</template>
		<template v-else>
			<block v-for="(item, i) in searchResult" :key="i">
				<template v-if="searchType == 'post'">
					<common-list :item='item' :index="i"></common-list>
					<divider></divider>
				</template>
				<template v-else-if="searchType == 'topic'">
					<topic-list :item='item' :index='i'></topic-list>
				</template>
				<template v-else-if="searchType == 'user'">
					<user-list :item='item' :i='i'></user-list>
				</template>
			</block>
		</template>
	</view>
</template>

<script>
	const postData = [
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
	const topicData = [
		{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
		{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
		{cover: '/static/demo/topicpic/1.jpeg', title: '话题名称', desc: '话题描述话题描述', news_count: '3', today_count: '1' },
	]
	const userData = [
		{'avatar': '../../static/default.jpg', username: '倩倩', sex: 1, age: '20', isFollow: true},
		{'avatar': '../../static/default.jpg', username: '乐乐', sex: 1, age: '16', isFollow: false},
		{'avatar': '../../static/default.jpg', username: '钰豪', sex: 0, age: '21', isFollow: true},
		{'avatar': '../../static/default.jpg', username: '小黑', sex: 2, age: '18', isFollow: false},
	]
	import commonList from '@/components/common/common-list.vue' //帖子组件
	import topicList from '@/components/news/topic-list.vue';    //话题组件
	import userList from '@/components/user-list/user-list.vue'; //用户组件
	export default {
		components: {
			commonList,
			topicList,
			userList
		},
		data() {
			return {
				searchText: '帖子', //搜索框中的文本
				searchType: 'post',
				historyArr: [
					{text: 'vue'},
					{text: 'uni-app第二季实战商城类app和小程序'},
					{text: 'vue实战'},
					{text: 'uni-app实战'},
					{text: 'vuex实战'},
					{text: 'uni-app第三季实战微信app和小程序开发'},
				],
				searchResult: []
			}
		},
		//页面生命周期-监听导航栏中的搜索框change事件
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text;
		},
		//页面声明周期-监听原生标题栏按钮点击事件（搜索）
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.searchEvent();
			}
		},
		onLoad(e) {
			this.searchType = e.type;
			let pageTit = '';
			switch (this.searchType){
				case 'post':
					pageTit = '帖子';
					break;
				case 'topic':
					pageTit = '话题';
					break;
				case 'user':
					pageTit = '用户';
					break;
			}
			/* 修改搜索占位符 */
			//得到webview的对象实例
			let currentWebview = this.$mp.page.$getAppWebview();
			//定义窗口的标题栏控件样式
			let tn = currentWebview.getStyle().titleNView; 
			//标题栏上的搜索框 的占位符
			tn.searchInput.placeholder = '搜索' + pageTit;
			//设置Webview窗口的样式
			currentWebview.setStyle({
				titleNView: tn  //定义窗口的标题栏控件样式
			})
			
		},
		methods: {
			clickSearchHistory(text){
				this.searchEvent();
			},
			searchEvent(){
				//软键盘收起
				uni.hideKeyboard();
				//加载中
				uni.showToast({
					icon: 'loading', 
					title: '加载中',
				})
				let listData;
				switch (this.searchType){
					case 'post':
						listData = postData;
						break;
					case 'topic':
						listData = topicData;
						break;
					case 'user':
						listData = userData;
						break;
				}
				setInterval(() => {
					this.searchResult = listData;
					uni.hideLoading();
				}, 3000)
			}
		}
	}
</script>

<style>

</style>
