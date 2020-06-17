<template>
	<view>
		<view class="py-2 text-center text-light-muted" v-if="shortTime">
			{{shortTime}}
		</view>
		<view class="flex align-start px-2 my-2"
		:style="isSelf ? 'flex-direction: row-reverse;' : ''">
			<image :src="item.avatar" mode="aspectFill"
			class="rounded-circle" style="width: 100rpx; height: 100rpx;"></image>
			<view class="p-2 mx-2 bg-light rounded" 
			style="margin-top: 10rpx; max-width: 400rpx; min-width: 100rpx;">
			{{item.data}}
			</view>
		</view>
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	export default {
		props: {
			item: Object,
			i: Number,
			pretime: [Number, String],
		},
		data() {
			return {
				uId: 1 //模拟当前用户user_id
			}
		},
		computed: {
			//本条气泡是否是用户本人的
			isSelf(){
				return this.item.user_id == this.uId;
			},
			//转化时间
			shortTime(){
				return $T.getChatTime(this.item.create_time, this.pretime);
			}
		},
	}
</script>

<style>
</style>
