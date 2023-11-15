<template>
	<div class="record-container">
		<a-card>
			<template #title>
				<div class="record-title" @click="toHome">
					<left-outlined />
					<span>出库记录</span>
				</div>
			</template>
			<div class="record-wrapper">
				<div class="badge-line">
					<div class="badge-btn" v-for="item in tagList" :key="item.label">
						<a-badge :count="item.count" :overflow-count="10">
							<a-button
								@click="handleChangeTag(item)"
								:type="tagActive == item.label ? 'primary' : 'default'"
							>
								{{ item.label }}
							</a-button>
						</a-badge>
					</div>
				</div>

				<a-table
					class="record-table scrollbar"
					:dataSource="dataSource"
					:columns="columns"
					:pagination="false"
				/>
			</div>
		</a-card>
	</div>
</template>

<script setup>
import { ref, reactive, h } from "vue";
import { useRouter } from "vue-router";
import { LeftOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const tagActive = ref("审批中");
const tagList = ref([
	{
		count: 0,
		label: "审批中",
	},
	{
		count: 99,
		label: "生效中",
	},
	{
		count: 99,
		label: "已过期",
	},
	{
		count: 5,
		label: "不通过",
	},
]);
const columns = ref([
	{
		title: "DEMO",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "使用期限",
		dataIndex: "time",
		key: "time",
	},
	{
		title: "申请事由",
		dataIndex: "reason",
		key: "reason",
	},
	{
		title: "审批结果",
		dataIndex: "result",
		key: "result",
	},
]);
const dataSource = ref([]);

for (let i = 0; i < 5; i++) {
	dataSource.value.push({
		key: i + 1,
		name: "多模态笔迹数据库",
		time: "2023-09-12",
		reason: "这里是申请事由，这里是申请事由",
		result: "因为不想给你通过",
	});
}

const toHome = () => {
	router.push("/");
};

const handleChangeTag = (item) => {
	tagActive.value = item.label;
};
</script>

<style lang="scss" scoped>
.record-container {
	width: 100%;
	height: 100%;
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
		width: 100%;
		height: 100%;
		.badge-line {
			display: flex;
			margin-bottom: 20px;
			.badge-btn {
				margin-right: 20px;
			}
		}
		.record-table {
			width: 100%;
			height: calc(100% - 56px);
			overflow: auto;
		}
	}
}
</style>
