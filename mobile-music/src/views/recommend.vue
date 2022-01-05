<template>
	<div>Recommend</div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { getRecommend } from "@/server/recommend";

export default defineComponent({
	name: "Recommend",
	setup() {
		onMounted(() => {
			getRecommend().then(res => {
				console.log("推荐列表", res);
			})
		})

		return {

		}
	}
});
</script>

<style lang="scss" scoped></style>
