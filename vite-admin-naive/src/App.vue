<template>
	<AppProvider>
		<!-- <n-space m-50>
			<n-button>Default</n-button>
			<n-button type="tertiary"> Tertiary </n-button>
			<n-button type="primary"> Primary </n-button>
			<n-button type="info"> Info </n-button>
			<n-button type="success"> Success </n-button>
			<n-button type="warning"> Warning </n-button>
			<n-button type="error"> Error </n-button>
		</n-space> -->
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
	</AppProvider>
</template>

<script setup>
import { onMounted } from "vue";
import AppProvider from "@/components/AppProvider/index.vue";

onMounted(() => {
	// $loadingBar.start();
	// setTimeout(() => {
	// 	$loadingBar.finish();
	// 	$message.success("加载完成，Perfect~");
	// }, 500);
});
</script>

<style lang="scss">
#app {
	height: 100%;
	.n-config-provider {
		height: inherit;
	}
}
</style>
