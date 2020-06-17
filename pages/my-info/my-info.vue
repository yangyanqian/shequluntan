<template>
	<view>
		<uni-list>
			<uni-list-item title="头像">
				<view class="flex align-center" slot="right" @click="changeUserPic()">
					<image :src="userData.userPic" mode="aspectFill"
					class="rounded-circle" style="width: 100rpx;height: 100rpx;"></image>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="昵称">
				<view class="flex align-center" slot="right">
					<input class="uni-input text-right" type="text" v-model="userData.userName" maxlength="10"/>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="性别">
				<view class="flex align-center" slot="right" @click="chooseItem('sex')">
					<text>{{userData.sex}}</text>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="生日">
				<view class="flex align-center" slot="right">
					<picker mode="date" :value="userData.birthday" :start="startDate" :end="endDate" 
					@change="chooseBirthday">
						<view>{{userData.birthday}}</view>
					</picker>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="情感">
				<view class="flex align-center" slot="right" @click="chooseItem('marital')">
					<text>{{userData.marital}}</text>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="职业">
				<view class="flex align-center" slot="right" @click="chooseItem('job')">
					<text>{{userData.job}}</text>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
			<uni-list-item title="家乡">
				<view class="flex align-center" slot="right"@click="chooseCity">
					<text>{{userData.hometown}}</text>
					<text class="iconfont icon-bianji1 font-md text-light-black ml-2"></text>
				</view>
			</uni-list-item>
		</uni-list>
		<button-com :text="buttonText" @click="submit"></button-com>
		<!-- 三级城市联动 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		:pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue';
	import buttonCom from '@/components/common/button-com.vue';
	export default {
		components: {
			uniList,
			uniListItem,
			mpvueCityPicker,
			buttonCom
		},
		data() {
			let currentDate = this.getDate();
			return {
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				
				userData: {
					userPic: "/static/default.jpg",
					userName: "杨倩",
					sex: "女",
					birthday: currentDate,
					marital: "未婚",
					job: "IT",
					hometown: "河南南阳",
				},
				choose: {
					sexArr: ['男', '女', '不限'],
					maritalArr: ['单身', '恋爱', '未婚', '已婚'],
					jobArr: ['教师', '医学', 'IT', '务农', '创业', '保安']
				},
				buttonText: "完成"
			}
		},
		computed: {
			startDate() {
				return this.getDate('start'); 
			},
			endDate() {
				return this.getDate('end'); 
			}
		},
		//监听返回键
		onBackPress() {
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
				return true
			}
		},
		//监听页面卸载事件
		onUnload() {
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		},
		methods: {
			//更换用户头像
			changeUserPic(){
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.userData.userPic = res.tempFilePaths[0];
					}
				})
			},
			//选择性别、情感、职业
			chooseItem(sign){
				let itemList = this.choose[sign + 'Arr'];
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						this.userData[sign] = itemList[res.tapIndex];
					}
				})
			},
			//获取当天日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//选择生日日期
			chooseBirthday(res){
				console.log(res);
				this.userData.birthday = res.detail.value;
			},
			//三级联动事件
			onConfirm(e){
				this.userData.hometown = e.label;
			},
			//显示mpvueCityPicker
			chooseCity(){
				this.$refs.mpvueCityPicker.show();
			},
			//点击完成
			submit(){
				console.log(this.userData);
			}
		}
	}
</script>

<style>
</style>
