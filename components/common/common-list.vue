<template>
	<view class="animated fast fadeIn">
		<view class="twItem p-2">
			<!-- 头像昵称 | 关注btn -->
			<view class="flex align-center">
				<image :src="item.userpic" class="mr-2" style="width:88rpx;height: 88rpx;"
				mode="aspectFill" @click="openSpace()"></image>
				<view class="flex-1 flex flex-column">
					<view class="tw_text_name font-md">{{item.username}}</view>
					<view class="tw_text_time font-sm text-light-muted">{{item.newstime}}</view>
				</view>
				<button class="font-sm px-3 rounded bg-main text-white animated faster" 
				hover-class="pulse" @click="follow()"
				v-if="!item.isFollow"
				>关注</button>
			</view>
			<!-- 贴子信息 -->
			<view class="tw_content pb-1" @click="openDetail()">
				<view class="tw_con_tit font-md py-2">{{item.title}}</view>
				<slot>
					<image class="rounded w-100" mode="aspectFill" style="height: 350rpx;"
					v-if="item.titlePic" :src="item.titlePic"></image>
				</slot>
			</view>
			<!-- 对帖子的操作（顶、踩、评论、分享） -->
			<view class="tw_operation flex">
				<view class="animated faster" hover-class="pulse" 
				@click="doSupport('support')"
				:class="item.support.type === 'support' ? 'text-main' : ''">
					<text class="iconfont icon-dianzan2 mr-2"></text>
					<text>{{item.support.support_count == 0 ? '顶' : item.support.support_count}}</text>
				</view>
				<view class="animated faster" hover-class="pulse" 
				@click="doSupport('unsupport')"
				:class="item.support.type === 'unsupport' ? 'text-main' : ''">
					<text class="iconfont icon-cai mr-2"></text>
					<text>{{item.support.unsupport_count == 0 ? '踩' : item.support.unsupport_count}}</text>
				</view>
				<view class="animated faster" hover-class="pulse" @click="doComment()">
					<text class="iconfont icon-pinglun2 font-lg mr-2"></text>
					<text>{{item.comment_count == 0 ? '评论' : item.comment_count}}</text>
				</view>
				<view class="animated faster" hover-class="pulse" @click="doShare()">
					<text class="iconfont icon-zhuanfa1 mr-2"></text>
					<text>{{item.share_num === 0 ? '分享' : item.share_num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: {
				type: Number,
				default: -1
			}, //listAll[listAllIndex].listItem[index]
			isDetail: { //是否处于详情页
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 打开个人空间
			openSpace(){
				//处于详情页
				if(this.isDetail) return
				uni.navigateTo({
					url: "/pages/my-space/my-space"
				})
			},
			//关注
			follow(){
				//通知父组件更新follow状态
				this.$emit('follow', this.index);
			},
			//进入详情
			openDetail(){
				//处于详情页
				if(this.isDetail) return
				uni.navigateTo({
					url: '../../pages/detail/detail?detail=' + JSON.stringify(this.item)
				})
			},
			//顶踩操作
			doSupport(type){
				this.$emit('doSupport', {
					type: type,
					i: this.i,
					index: this.index
				})
			},
			// 评论
			doComment(){
				if(!this.isDetail) return this.openDetail();
				this.$emit('doComment')
			},
			//分享
			doShare(){
				if(!this.isDetail) return this.openDetail();
				this.$emit('doShare');
			}
		}
	}
</script>

<style lang="scss">
.twItem {
	.tw_userInfo {
		&_text {
			&>view {
				flex-grow: 1;
				display: flex;
				align-items: center;
			}
		}
	}
	.tw_operation {
		&>view {
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
