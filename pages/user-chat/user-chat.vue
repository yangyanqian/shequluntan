<template>
	<view>
		<scroll-view scroll-y="true" class="pb-4"
		style="position: absolute;left: 0;top: 0;right: 0;bottom: 89rpx;"
		:scroll-into-view="scrollInto" scroll-with-animation>
			<block v-for="(item, i) in listData">
				<view :id="'chat' + i">
					<user-chat :item="item" :i="i" 
					:pretime="i > 0 ? listData[i-1].create_time : ''"></user-chat>
				</view>
			</block>
		</scroll-view>
		<!-- 底部输入框 -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import userChat from '@/components/user-list/user-chat.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	export default {
		components: {
			userChat,
			bottomInput
		},
		data() {
			return {
				scrollInto: '',
				listData: [
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '你好呀',
						type: 'text', //image video audio
						create_time: 1589809011
					},
					{
						user_id: 1,
						avatar: '../../static/default.jpg',
						username: 'yangqian',
						data: '你好呀大声说拜拜nsdifhisehwihfoiureogoihrgo',
						type: 'text', //image video audio
						create_time: 1589896716
					},
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '纯音乐，请欣赏',
						type: 'text', //image video audio
						create_time: 1589895500
					},
					{
						user_id: 1,
						avatar: '../../static/default.jpg',
						username: 'yangqian',
						data: '你好呀大声说拜拜nsdifhisehwihfoiureogoihrgo',
						type: 'text', //image video audio
						create_time: 1589896716
					},
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '纯音乐，请欣赏',
						type: 'text', //image video audio
						create_time: 1589895500
					},
					{
						user_id: 1,
						avatar: '../../static/default.jpg',
						username: 'yangqian',
						data: '你好呀大声说拜拜nsdifhisehwihfoiureogoihrgo',
						type: 'text', //image video audio
						create_time: 1589896716
					},
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '纯音乐，请欣赏',
						type: 'text', //image video audio
						create_time: 1589895500
					},
					{
						user_id: 1,
						avatar: '../../static/default.jpg',
						username: 'yangqian',
						data: '你好呀大声说拜拜nsdifhisehwihfoiureogoihrgo',
						type: 'text', //image video audio
						create_time: 1589896716
					},
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '纯音乐，请欣赏',
						type: 'text', //image video audio
						create_time: 1589895500
					},
					{
						user_id: 1,
						avatar: '../../static/default.jpg',
						username: 'yangqian',
						data: '你好呀大声说拜拜nsdifhisehwihfoiureogoihrgo',
						type: 'text', //image video audio
						create_time: 1589896716
					},
					{
						user_id: 2,
						avatar: '../../static/demo/datapic/10.jpg',
						username: 'yangqian',
						data: '纯音乐，请欣赏',
						type: 'text', //image video audio
						create_time: 1589895500
					}
				]
			}
		},
		onReady(){
			//进入页面后将聊天滚到最底部
			this.pageToBottom();
		},
		methods: {
			//发送聊天
			submit(data){
				let obj = {
					user_id: 1,
					avatar: '../../static/demo/datapic/10.jpg',
					username: 'yangqian',
					type: 'text', //image video audio
					data: data,
					create_time: (new Date()).getTime()
				}
				
				this.listData.push(obj);
				this.pageToBottom();
			},
			//聊天记录滚动到底部
			pageToBottom(){
				setTimeout(() => {
					let lastIndex = this.listData.length - 1;
					if(lastIndex < 0) return
					this.scrollInto = 'chat' + lastIndex;
				}, 300)
			}
		}
	}
</script>

<style>

</style>
