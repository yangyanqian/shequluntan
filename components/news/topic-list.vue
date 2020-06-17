<template>
	<view class="py-1 flex" @click="openDetail">
		<image :src="item.cover" mode="aspectFill"
		class="rounded mr-2" style="width: 150rpx; height: 150rpx;"></image>
		<view class="flex flex-column justify-between flex-1">
			<text class="font-md font-weight-bold">#{{item.title}}#</text>
			<text class="font text-light-black flex flex-column text-ellipsis">{{item.desc}}</text>
			<view>
				<text class="font text-light-black mr-2">动态: {{item.news_count}}</text>
				<text class="font text-light-black">今日: {{item.today_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			openDetail() {
				uni.navigateTo({
					url: "../../pages/topic-detail/topic-detail"
				})
			}
		},
	}
</script>

<style>
</style>
