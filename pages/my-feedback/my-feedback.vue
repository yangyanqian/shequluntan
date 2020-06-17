<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="客服什么时候在线" showAnimation>
				<text class="content p-2 pt-0">亲爱的杨倩，客服工作时间为：周一至周六10:00-12:00,14:00-19:00，非工作时间的咨询反馈会自动转为留言，客服上班后会第一时间回复哦~
				<br>
				PS.紧急问题可以加官方XXXXXXX进行反馈
				</text>
			</uni-collapse-item>
			<uni-collapse-item title="忘记账号/昵称/密码怎么办？" showAnimation>
				<text class="content p-2 pt-0">点击重置</text>
			</uni-collapse-item>
			<uni-collapse-item title="怎么搜索/查找/关注/取消用户？" showAnimation>
				<text class="content p-2 pt-0">.........</text>
			</uni-collapse-item>
		</uni-collapse>
		<button-com :text="buttonText" @click="feedback"></button-com>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue';
	import buttonCom from '@/components/common/button-com.vue';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			buttonCom
		},
		data() {
			return {
				buttonText: "意见反馈"
			}
		},
		methods: {
			feedback(){
				console.log('feedback');
			}
		}
	}
</script>

<style>

</style>
