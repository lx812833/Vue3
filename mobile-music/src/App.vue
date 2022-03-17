<template>
	<m-header />
	<tab />
	<router-view></router-view>
	<player />
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import Player from "./components/player/player.vue";

export default defineComponent({
	name: "App",
	components: {
		MHeader: Header,
		Tab,
		Player,
	},
});
</script>
