<template>
	<view>
		<!-- <uni-popup type="top"></uni-popup> -->
		<template v-if="list.length > 0">
			<block v-for="(item, i) in list" :key="i">
				<msg-list :item="item" :i="i"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 导航右侧按钮-弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="popup-wrap px-2">
				<view class="flex align-center justify-center py-2 border-bottom border-light-secondary"
				@click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text>
					<text>添加好友</text>
				</view>
				<view class="flex align-center justify-center py-2 border-bottom border-light-secondary"
				@click="popupEvent('clear')">
					<text class="iconfont icon-shanchu mr-2"></text>
					<text>清除列表</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var demoList = [
		{
			"avatar": '../../static/default.jpg',
			"username": "15677878909",
			"update_time": 1589509708,
			"data": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
			"noread": 2
		},
		{
			"avatar": '../../static/default.jpg',
			"username": "15677878909",
			"update_time": 1589509708,
			"data": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
			"noread": 10
		},
		{
			"avatar": '../../static/default.jpg',
			"username": "15677878909",
			"update_time": 1589509708,
			"data": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
			"noread": 4
		},
	]
	import msgList from '@/components/msg/msg-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	export default {
		components: {
			msgList,
			uniPopup
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = demoList
			/* uni.startPullDownRefresh({
				success: () => {
					this.list = demoList
				}
			}) */
		},
		//监听用户下拉刷新事件
		onPullDownRefresh(){
			setTimeout(() => {
				this.list = [...this.list, ...this.list]
				uni.stopPullDownRefresh()
			}, 2000)
		},
		//监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0: //左边
					//先关闭弹出层
					this.$refs.popup.close()
					uni.navigateTo({
						url: '../user-list/user-list'
					})
					break;
				case 1: //右边
					this.$refs.popup.open()
					break;
			}
		},
		methods: {
			popupEvent(val){
				switch (val){
					case 'friend':
						uni.navigateTo({
							url: '../search/search?type=user'
						})
						this.$refs.popup.close();
						break;
					case 'clear':
						this.$refs.popup.close();
						break;
				}
			}
		}
	}
</script>

<style>
</style>
