<template>
	<view class="content">
		<!-- 图表演示 -->
		<text class="iconfont icon-smile" style="font-size: 100rpx; color: #09BB07;"></text>
		<!-- 动画使用方式一：点击效果 -->
		<view class="animated faster " hover-class="rubberBand" style="border: 1rpx solid #000; padding: 20px;">点击效果</view>
		<!-- 动画使用效果二：v-if -->
		<!-- 动画使用效果三：列表渲染 -->
		
		<!-- 组件使用 -->
		<view hover-class="view-box" hover-stay-time="800" hover-start-time="1000">view元素</view>
		<text selectable="true" space='nbsp'>这是text元素这是text元素这 \n 是text元素这是text元素 </text>
		<rich-text :nodes="strings"></rich-text>
		<rich-text :nodes="str"></rich-text>
		
		<!-- @tap 时间处理 -->
		<button @tap="handleClick">点击事件</button>
		<!-- template进行列表渲染，block进行条件渲染 -->
		<!-- v-for遍历数组、json -->
		<template>
			<text>v-for遍历数组↓</text>
			<view v-for="(item, index) in arr" :key="index">{{index + '--->' + item}}</view>
			<text>v-for遍历json</text>
			<view v-for="(val, key) in json">{{key + '--->' + val}}</view>
		</template>
		<!-- 条件渲染 -->
		<block>
			<view v-if="num <= 3">num小于等于3</view>
			<view v-else-if="num > 3">num大于3</view>
			<button @tap="addNum()" style="width: 50vw;">增加num值</button>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>',
				str: `<h1>123</h1>
						<p>我是p标签</p>
						<a href="/">一个a标签</a>
						<strong>一个strong标签</strong>`,
				arr: ['ab', 'cd', 'ef', 'gh'],
				json: {
					name: 'yangqian',
					age: 18,
					sex: 1,
					interest: 'read'
				},
				num: 1
			}
		},
		onLoad() {

		},
		methods: {
			handleClick(){
				console.log('触发了一个点击事件')
			},
			addNum(){
				this.num++;
			}
		},
		watch: {}
	}
</script>

<style>
.content {
	padding-bottom: 100rpx;
}
.view-box {
	border-bottom: 1px #007AFF solid;
}
</style>
