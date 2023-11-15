<template>
	<div class="record-container">
		<iframe
			src="https://pre-ykktest.isigning.cn/aos-admin/#/user/login"
			width="100%"
			height="100%"
			frameborder="0"
		></iframe>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const { id: demoId, name: demoName } = route.query;

const toHome = () => {
	router.push("/");
};
</script>

<style lang="scss" scoped>
.record-container {
	width: 100%;
	height: 100%;
	background: rgba(239, 242, 249, 1);
	:deep(.ant-card) {
		width: 100%;
		height: 100%;
	}
	:deep(.ant-card-head) {
		padding: 0 12px;
	}
	:deep(.ant-card-body) {
		width: 100%;
		height: calc(100% - 58px);
	}
	.record-title {
		width: 110px;
		font-size: 20px;
		font-weight: 500;
		color: rgba(14, 22, 54, 1);
		cursor: pointer;
		span {
			margin-left: 8px;
		}
	}
	.record-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
}
</style>
