<template>
	<div class="record-container">
		<a-card>
			<template #title>
				<div class="record-title" @click="toHome">
					<left-outlined />
					<span>出库申请</span>
				</div>
			</template>
			<div class="record-wrapper">
				<div class="record-form">
					<a-form
						:model="formState"
						:label-col="{ style: 'width: 120px' }"
						:wrapper-col="{ span: 16 }"
						autocomplete="off"
						@finish="handleSubmit"
					>
						<a-form-item
							label="DEMO名称"
							name="name"
							:rules="[{ required: true, message: '请输入DEMO名称!' }]"
						>
							<a-input
								v-model:value="formState.name"
								placeholder="请输入"
								readonly
							/>
						</a-form-item>
						<a-form-item
							label="使用期限"
							name="deadline"
							:rules="[
								{
									required: true,
									message: '请选择使用期限!',
									trigger: 'change',
									type: 'object',
								},
							]"
						>
							<a-date-picker
								v-model:value="formState.deadline"
								type="date"
								format="YYYY-MM-DD"
								:disabled-date="disabledDate"
								placeholder="请选择"
								style="width: 100%"
							/>
						</a-form-item>
						<a-form-item
							label="申请事由"
							name="desc"
							:rules="[
								{ required: true, message: '请输入申请事由!', trigger: 'blur' },
							]"
						>
							<a-textarea v-model:value="formState.desc" placeholder="请输入" />
						</a-form-item>

						<a-form-item
							:wrapper-col="{ offset: 6, span: 10 }"
							style="margin-top: 150px; text-align: center"
						>
							<a-button type="primary" style="width: 327px" html-type="submit">
								提交申请
							</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</a-card>
	</div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, reactive, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LeftOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();
const { id: demoId, name: demoName } = route.query;

const formState = reactive({
	id: demoId,
	name: demoName,
	deadline: "",
	desc: "",
});

const disabledDate = (current) => {
	return current && current < dayjs().startOf("day");
};

const handleSubmit = (val) => {
	const params = Object.assign({}, formState);
	params["deadline"] = dayjs(val.deadline).format("YYYY-MM-DD");
	console.log("Success:", params);
};

const toHome = () => {
	router.push("/");
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
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		.record-form {
			width: 80%;
			height: 100%;
		}
	}
}
</style>
