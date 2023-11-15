<template>
	<STree :treeData="treeData" />

	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="./assets/images/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/images/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
		<h3>{{ number }}</h3>
	</div>
	<HelloWorld
		ref="hello"
		msg="Vite + Vue"
		@increase="increaseNumber"
		@update="updateNumber"
	/>
	<br />
	<br />
	<br />
	<ReactBlock />
	<br />
	<br />
	<br />
	<VModel v-model:test1="test1" v-model:test2="test2" />

	<van-button type="success" @click="updateTest(1)">Test1</van-button>
	<van-button type="warning" @click="updateTest(2)">Test2</van-button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTestStore } from "@/store/test";
import HelloWorld from "@/components/helloWorld.vue";
import ReactBlock from "@/components/rectBlock.vue";
import VModel from "@/components/vModel.vue";
import STree from "@/components/Tree";

const treeData = ref([
	{
		label: "一级 11",
		level: 1,
		children: [
			{
				label: "二级 1-1",
				level: 2,
				children: [
					{
						level: 3,
						label: "三级 1-1-1",
					},
				],
			},
		],
	},
	{
		label: "二级 1",
		level: 1,
	},
]);

const hello = ref(null);
const number = ref(0);

const test1 = ref("test1");
const test2 = ref("test2");
const updateTest = (val) => {
	if (val === 1) {
		test1.value = Math.random() >= 0.5 ? "changed test1" : "test1";
	} else {
		test2.value = Math.random() >= 0.5 ? "changed test2" : "test2";
	}
};

const increaseNumber = () => {
	number.value += 1;
};

const updateNumber = (val) => {
	number.value = val;
	const { age, name, count } = hello.value;
	console.log("hello2", age, name, count);
};

onMounted(() => {
	const { age, name, count } = hello.value;
	console.log("hello1", age, name, count);
	const testStore = useTestStore();
	testStore.handleLogin();
});
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
h3 {
	margin: 20px auto;
	color: aqua;
}
</style>
