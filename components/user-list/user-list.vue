<template>
	<view class="flex align-center py-2 mx-2">
		<image style="width: 100rpx; height: 100rpx;"
		class="mr-2 rounded-circle"
		:src="item.avatar"></image>
		<view class="flex-1 flex flex-column">
			<text class="font-md text-dark">{{ item.username }}</text>
			<uni-badge size="small"
			:text="item.age"
			:type="item.sex === 1 ? 'pink' : 'primary'">
				<text class="iconfont text-white font-sm" style="margin-right: 6rpx;"
				v-if="item.sex > 0"
				:class="item.sex === 1 ? 'icon-nv' : 'icon-nan'"></text>
			</uni-badge>
		</view>
		<view class="uni-icon uni-icon-checkbox-filled"
		:class="item.isFollow ? 'text-main' : 'text-light-muted'"></view>
	</view>
</template>

<script>
	import uniBadge from '../uni-ui/uni-badge/uni-badge.vue';
	export default {
		props: {
			item: Object,
			i: Number
		},
		components: {
			uniBadge
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
