<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="handleAddCount"></image>
		<view class="text-area">
			<text class="title">{{ title }}~{{ user.count }}</text>
		</view>

    <uni-icons type="bars" size="16" />
	</view>
</template>

<script setup>
import useStore from "@/store";
import { wxLogin, getPhoneNumber } from "@/api/user.js";

const { user } = useStore();
const title = `hello`;

const handleAddCount = async () => {
	uni.login({
		provider: "weixin",
		success: (loginRes) => {
      console.log("登录的", loginRes);
			const jsCode = loginRes.code;
			wxLogin({ jsCode }).then((res) => {
				const { openId } = res.data;
				user.setUserInfo({ openId });
			});
		},
	});
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
