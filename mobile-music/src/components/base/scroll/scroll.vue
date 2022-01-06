<template>
	<div ref="rootRef">
		<slot></slot>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useScroll } from "./useScroll";

export default defineComponent({
	name: "Scroll",
	props: {
		click: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const rootRef = ref(null);
		const scroll = useScroll(rootRef, props);

		return {
			rootRef,
			scroll,
		};
	},
});
</script>
