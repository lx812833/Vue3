<template>
	<div class="card">
		<p>{{ msg }}</p>
		<p>{{ testStore.age }}</p>
		<p>storeToRefs：{{ age }}</p>
		<p>computed：{{ name }}</p>
		<p>getters：{{ testStore.fullName }}</p>
		<van-button type="primary" @click="count++">
			主要按钮 {{ count }}
		</van-button>
		<van-button type="success" @click="changeTestAge">成功按钮</van-button>
		<van-button type="warning" @click="handleUpdate">警告按钮</van-button>
		<!-- <van-button type="default">默认按钮</van-button> -->
		<!-- <van-button type="danger">危险按钮</van-button> -->
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";

const testStore = useTestStore();
// 使用pinia storeToRefs 解构赋值具有响应性
const { age } = storeToRefs(testStore);
// 或者直接使用computed来获取store里的值
const name = computed(() => testStore.name);
const count = ref(0);

const props = defineProps({
	msg: {
		type: String,
		required: true,
	},
});

const emits = defineEmits(["increase", "update"]);

const changeTestAge = () => {
	emits("increase");
	testStore.updateAge();
};

const handleUpdate = () => {
	emits("update", 3);
};

// 把数据导出，供父组件使用，相当于子传父
defineExpose({
	age,
	name,
	count,
});
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 25px;
	font-size: $font-size-medium;
	color: $color-sub-theme;
}
</style>

<!--
	defineProps 、defineEmits 、 defineExpose 和 withDefaults
	这四个宏函数只能在 <script setup> 中使用，无需导入

	withDefaults：作用是给defineProps绑定默认值的api
-->

<!-- <script setup lang="ts">
interface Props {
	msg?: string;
	labels?: string[];
}

const props = withDefaults(defineProps<Props>(), {
	msg: "hello vue3!",
	labels: () => ["one", "two"],
});
</script> -->
