<template>
	<view class="p-2">
		<button class="w-100 text-white rounded-circle flex align-center justify-center" 
		type="primary" style="height: 88rpx;"
		:disabled="disabled" :class="disabled ? 'bg-main-disabled': 'bg-main'"
		@click="onClick()">
			{{text}}
		</button>
	</view>
</template>

<script>
	export default {
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: ""
			}
		},
		onLoad() {
			console.log(this.disabled)
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style>
</style>
