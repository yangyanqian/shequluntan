<template>
	<view class="px-2 border-bottom">
		<view class="py-2 flex align-center">
			<text class="flex-1 font-md font-weight-bold">热门分类</text>
			<view @click="openMore">
				<text class="text-light-muted">更多</text>
				<text class="iconfont icon-jinru text-light-muted font-md"></text>
			</view>
		</view>
		<view class="flex flex-wrap pb-1">
			<view class="border rounded bg-light mx-1 mb-1 px-2 animated" 
			hover-class="pulse" v-for="(item, i) in hotCateData" :key="i">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['hotCateData'],
		data() {
			return {
				key: ''
			}
		},
		methods: {
			openMore() {
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav'
				})
			}
		},
	}
</script>

<style>
</style>
