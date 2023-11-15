<template>
	<div class="home-container">
		<a-card
			:tab-list="tabListNoTitle"
			:active-tab-key="noTitleKey"
			@tabChange="(key) => onTabChange(key, 'noTitleKey')"
		>
			<div class="home-wrapper">
				<a-form
					:model="formState"
					:label-col="labelCol"
					labelAlign="left"
					layout="inline"
					autocomplete="off"
					@finish="handleSearch"
				>
					<a-form-item label="DEMO名称" name="name">
						<a-input v-model:value="formState.name" placeholder="请输入" />
					</a-form-item>

					<a-form-item :wrapper-col="{ offset: 8, span: 16 }">
						<a-button
							type="primary"
							html-type="submit"
							:icon="h(SearchOutlined)"
						>
							搜索
						</a-button>
					</a-form-item>
				</a-form>

				<div class="list-wrapper scrollbar">
					<div
						class="item-content"
						v-for="item in 1"
						@click="handleToAsk(item)"
					>
						<img class="item-image" src="@/assets/images/cover.png" />
						<div class="item-name">签字上墙</div>
						<div class="item-tag" v-if="item % 2 == 0">待出库</div>
					</div>
				</div>
			</div>

			<template #tabBarExtraContent>
				<a-button type="primary" @click="toRecordList">出库记录</a-button>
			</template>

			<MessageBox msg="hello" @jsxClick="handleJsxClick">
				<template #default>
					<span>这是默认插槽</span>
				</template>
				<template #header>
					<span>这是header插槽</span>
				</template>
			</MessageBox>
		</a-card>

		<a-modal
			class="modal-wrapper"
			v-model:open="isOpen"
			:closable="false"
			:maskClosable="false"
			centered
			destroyOnClose
			:title="null"
			:width="480"
		>
			<div class="modal-content">
				<img class="content-image" src="@/assets/images/cover.png" />
				<div class="content-name">签字上墙</div>
			</div>
			<template #footer>
				<div class="modal-footer">
					<div class="footer-item" @click="isOpen = false">取消出库</div>
					<div class="footer-item" @click="handleToApply">出库申请</div>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script setup>
import { ref, reactive, h } from "vue";
import { useRouter } from "vue-router";
import { SearchOutlined } from "@ant-design/icons-vue";

import { MessageBox } from "./messageBox";

const router = useRouter();
const isOpen = ref(false);
const key = ref("tab1");
const noTitleKey = ref("app");
const current = ref(null);
const tabListNoTitle = [
	{
		key: "article",
		tab: "演示类",
	},
	{
		key: "app",
		tab: "产品类",
	},
];
const labelCol = { style: { width: "100px" } };
const formState = reactive({
	name: "",
});

const handleJsxClick = (item) => {
	console.log("点击了", item);
};

const onTabChange = (value, type) => {
	if (type === "key") {
		key.value = value;
	} else if (type === "noTitleKey") {
		noTitleKey.value = value;
	}
};

const handleSearch = () => {
	console.log("搜索", formState.name);
};

const toRecordList = () => {
	router.push("/record");
};

const handleToAsk = (item) => {
	current.value = {
		id: item,
		name: "傲雄DEMO管理系统",
	};
	if (item % 2 == 0) {
		isOpen.value = true;
		// current.value = item
	} else {
		router.push({
			path: "/iframe",
			query: {
				id: current.value.id,
				name: current.value.name,
			},
		});
	}
};

const handleToApply = () => {
	isOpen.value = false;
	router.push({
		path: "/apply",
		query: {
			id: current.value.id,
			name: current.value.name,
		},
	});
};
</script>

<style lang="scss" scoped>
.home-container {
	width: 100%;
	height: 100%;
	:deep(.ant-card) {
		width: 100%;
		height: 100%;
	}
	:deep(.ant-card-body) {
		width: 100%;
		height: calc(100% - 58px);
	}
	.home-wrapper {
		width: 100%;
		height: 100%;
		.list-wrapper {
			width: 100%;
			height: calc(100% - 56px);
			margin-top: 24px;
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			.item-content {
				position: relative;
				width: 284px;
				height: 179px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				margin-right: 24px;
				margin-bottom: 60px;
				padding: 8px;
				border-radius: 8px;
				background: rgba(14, 98, 224, 0.1);
				.item-image {
					width: 100%;
					height: 100%;
					border-radius: 8px;
					cursor: pointer;
				}
				.item-name {
					width: 100%;
					margin-top: 20px;
					font-size: 18px;
					font-weight: 400;
					line-height: 18px;
					letter-spacing: 0px;
					text-align: center;
				}
				.item-tag {
					position: absolute;
					display: flex;
					align-items: center;
					justify-content: center;
					right: 0;
					top: 16px;
					width: 72px;
					height: 28px;
					border-top-left-radius: 20px;
					border-bottom-left-radius: 20px;
					font-family: PingFang SC;
					font-size: 16px;
					font-weight: 400;
					line-height: 16px;
					letter-spacing: 0px;
					color: rgba(255, 255, 255, 1);
					background: rgba(14, 98, 224, 1);
				}
			}
		}
	}
}
</style>

<style lang="scss">
.modal-wrapper {
	.ant-modal-content {
		padding: 0;
	}
	.ant-modal-body {
		padding-top: 40px;
	}
	.modal-content {
		position: relative;
		width: 360px;
		height: 226px;
		padding: 10px;
		margin: 0 auto 72px auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		border-radius: 8px;
		background: rgba(14, 98, 224, 0.1);
		.content-image {
			width: 100%;
			height: 100%;
			border-radius: 8px;
			cursor: pointer;
		}
		.content-name {
			width: 100%;
			margin-top: 28px;
			font-size: 18px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0px;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgba(231, 231, 231, 1);
		width: 100%;
		height: 64px;
		.footer-item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: 400;
			line-height: 16px;
			cursor: pointer;
			&:first-child {
				color: rgba(64, 64, 64, 1);
				border-right: 1px solid rgba(231, 231, 231, 1);
			}
			&:last-child {
				color: rgba(14, 98, 224, 1);
			}
		}
	}
}
</style>
