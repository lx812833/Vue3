<template>
	<m-header />
	<tab />
	<router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";

export default defineComponent({
	name: "App",
	components: {
		MHeader: Header,
		Tab
	},
});
</script>
