<template>
	<div class="singer" v-loading="!singers.length">
		<index-list :data="singers"></index-list>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getSingerList } from "@/server/singer";
import IndexList from "@/components/base/indexList/indexList";

export default defineComponent({
	name: "Singer",
	components: {
		IndexList,
	},
	setup() {
		let state = reactive({
			singers: [],
		});

		onMounted(() => {
			getSingerList().then((res) => {
				state.singers = res.singers;
			});
		});

		return {
			...toRefs(state),
		};
	},
});
</script>

<style lang="scss" scoped>
.singer {
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
}
</style>
