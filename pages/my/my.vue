<template>
	<view>
		<navigator url="../login/login">
			<view class="p-2 flex align-center"
			hover-class="bg-light">
				<image src="../../static/demo/topicpic/9.jpeg" mode="aspectFill"
				style="width: 100rpx; height: 100rpx;" class="rounded-circle mr-2"></image>
				<view class="flex-1 flex flex-column">
					<text class="font-md font-weight-bold flex-1 flex align-center">15639427</text>
					<view class="font text-light-black">
						<text class="mr-1">总帖子1</text>
						<text>今日帖子0</text>
					</view>
				</view>
				<text class="iconfont icon-jinru font-lg"></text>
			</view>
		</navigator>
		<view class="flex p-2">
			<block v-for="(item, i) in myData" :key="i">
				<view class="flex-1 flex flex-column align-center">
					<text class="font-md font-weight-bold mb-1">{{item.num}}</text>
					<text class="font text-light-black">{{item.name}}</text>
				</view>
			</block>
		</view>
		<view class="px-3 pb-2">
			<image src="../../static/demo/datapic/12.jpg" mode="aspectFill"
			class="rounded my-2 w-100" style="height: 170rpx;"></image>
		</view>
		<uni-list>
			<uni-list-item title="浏览历史" showExtraIcon>
				<text slot="icon" class="iconfont icon-liulan font-lg"></text>
			</uni-list-item>
			<uni-list-item title="社区认证" showExtraIcon>
				<text slot="icon" class="iconfont icon-huiyuanvip font-md"></text>
			</uni-list-item>
			<uni-list-item title="审核帖子" showExtraIcon>
				<text slot="icon" class="iconfont icon-keyboard font-md"></text>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				myData: [
					{name: "动态", num: 1},
					{name: "话题", num: 2},
					{name: "评论", num: 3},
					{name: "粉丝", num: 4}
				]
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../my-set/my-set'
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
