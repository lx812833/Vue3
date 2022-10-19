<template>
	<div class="wrapper">
		v-model
		<br />
		<br />
		<br />
		<h3>{{ test1 }}</h3>
		<h3>{{ test2 }}</h3>
		<br />
		<h4>test1赋值的值：{{ test3 }}</h4>

		<br />
		<van-button type="default" @click="updateToFatherTest1">子变父Test1</van-button>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	test1: {
		type: String,
	},
	test2: {
		type: String,
	},
});

const emits = defineEmits(["update:test1"]);

const test3 = ref("");

watch(() => props.test1, (val) => {
		test3.value = val;
		console.log("监听到的tets1", val);
	},
	{
		immediate: true,
		deep: true,
	}
);

const updateToFatherTest1 = () => {
  emits("update:test1", "子改变父组件的Test1值");
}

</script>

<style lang="scss" scoped>
.wrapper {
	margin: 50px auto;
	font-size: 24px;
	color: #000;
}
</style>
