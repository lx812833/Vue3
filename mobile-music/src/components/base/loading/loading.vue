<template>
	<div class="loading">
		<div class="loading-content">
			<img width="24" height="24" src="./loading.gif" />
			<p class="desc">{{ title }}</p>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "Loading",
	setup() {
		const title = ref("正在加载中...");
		const setLoadingTitle = (val) => {
      title.value = val;
		};
		return {
			title,
			setLoadingTitle,
		};
	},
});
</script>

<style lang="scss" scoped>
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	.loading-content {
		text-align: center;
		.desc {
			line-height: 20px;
			font-size: $font-size-small;
			color: $color-text-l;
		}
	}
}
</style>
