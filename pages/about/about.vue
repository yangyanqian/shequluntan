<template>
	<view>
		<view class="flex flex-column align-center pt-2">
			<image src="../../static/demo/datapic/10.jpg" mode="aspectFill"
			style="width: 300rpx; height: 300rpx; border-radius: 300rpx;" class=""></image>
			<text class="font-md text-light-muted my-3">version 1.0.1</text>
		</view>
		<uni-list>
			<uni-list-item title="新版本检测"></uni-list-item>
			<uni-list-item title="社区用户协议"></uni-list-item>
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
				
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
