<template>
	<div class="wrap">
		<div class="card" ref="domRef">
			<strong>ABCD</strong>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";

const useMouse = () => {
	const domRef = ref(null);
	const mousePos = ref({ x: 0, y: 0 });
	const rect = ref({ w: 0, h: 0 });

	const movePosition = (e) => {
		mousePos.value = {
			x: e.offsetX,
			y: e.offsetY + 20,
		};
	};

	onMounted(() => {
		rect.value = {
			w: domRef.value.clientWidth,
			h: domRef.value.clientHeight,
		};

		domRef.value.addEventListener("mousemove", movePosition);
	});

	onUnmounted(() => {
		domRef.value.removeEventListener("mousemove", movePosition);
	});

	return {
		rect,
		domRef,
		mousePos,
	};
};

const { domRef, mousePos, rect } = useMouse();

const trans = computed(() => {
	const rotateX = -(mousePos.value.y / rect.value.h) * 1.8;
	const rotateY = (mousePos.value.x / rect.value.w - 0.5) * 2.2;
	return `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
});

const color = computed(() => {
	return mousePos.value.x > 100 ? "pink" : "blue";
});
</script>

<style lang="scss" scoped>
.wrap {
	perspective: 40px;
	padding-top: 20px;
	.card {
		display: grid;
		width: 20em;
		height: 12em;
		margin: 0 auto;

		transition: transform;
		transform: v-bind(trans);
		/**
      用于设置旋转元素的基点位置
      默认值：transform-origin:50% 50% 0;
      transform-origin属性值可以是百分比、em、px等具体的值，也可以是top、right、bottom、left和center这样的关键词。
    */
		transform-origin: center 20px;

		background: #f3f3f3;
		box-shadow: 3px 2px 8px 2px #c5c5c59e;
	}
	.card strong {
		place-self: center;
		font-size: 42px;
		color: v-bind(color);
	}
}
</style>
