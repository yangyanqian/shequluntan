<template>
	<view class="mx-2 py-2 flex animated fast fadeIn"
	hover-class="bg-light"
	@click="openDetail()">
		<image :src="item.avatar" mode="aspectFill"
		class="rounded-circle mr-2"style="width: 100rpx; height: 100rpx;"></image>
		<view class="flex-1">
			<view class="flex">
				<text class="flex-1 font-md font-weight-bold">{{item.username}}</text>
				<text class="font-sm text-light-muted">{{item.update_time | formateTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="font-sm text-body text-ellipsis" style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge :text="item.noread" type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '../uni-ui/uni-badge/uni-badge.vue';
	import $T from '@/common/time.js';
	export default {
		props: {
			item: Object,
			i: Number
		},
		components: {
			uniBadge	
		},
		filters: {
			formateTime(val){
				return $T.gettime(val);
			}
		},
		methods: {
			openDetail(){
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat'
				})
			}
		}
	}
</script>

<style>
</style>
