<template>
	<div class="progress-bar" ref="progressBarRef" @click="onClickBar">
		<div class="bar-inner">
			<div class="progress" ref="progressRef" :style="progressStyle"></div>
			<div class="progress-btn-wrapper"
				:style="btnStyle"
				@touchstart.prevent="onTouchStart"
				@touchmove.prevent="onTouchMove"
				@touchend.prevent="onTouchEnd"
			>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted, nextTick, reactive, toRefs} from "vue";
const progressBtnWidth = 16;

export default defineComponent({
	name: "ProgressBar",
	emits: ["progress-changing", "progress-changed"],
	props: {
		progress: {
			type: Number,
			default: 0,
		},
	},
	setup(props, { emit }) {
		// data
		const offset = ref(0);
		const progressRef = ref(null);
		const progressWidth = ref(0);
		const progressBarRef = ref(null);
		const touch = reactive({});

		// watch
		watch(() => props.progress, (newVal) => {
      const barWidth = progressWidth.value - progressBtnWidth;
      offset.value = barWidth * newVal;
    });

		// computed
		const progressStyle = computed(() => {
			return `width: ${offset.value}px`;
		});
		const btnStyle = computed(() => {
			return `transform: translate3d(${offset.value}px, 0, 0)`;
		});

		// methods
		const onTouchStart = (e) => {
			touch.x1 = e.touches[0].pageX;
			touch.beginWidth = progressRef.value.clientWidth;
		}
		const onTouchMove = (e) => {
			const delta = e.touches[0].pageX - touch.x1;
			const tempWidth = touch.beginWidth + delta;
			const progress = Math.min(1, Math.max(tempWidth / progressWidth.value, 0));
			offset.value = progressWidth.value * progress;
			emit("progress-changing", progress);
		}
		const onTouchEnd = () => {
			const barWidth = progressWidth.value - progressBtnWidth;
			const progress = Math.min(progressRef.value.clientWidth / barWidth, 1);
			emit("progress-changed", progress);
		}
		const onClickBar = (e) => {
			/**
			 * getBoundingClientRect
			 * 返回元素的大小及其相对于视口的位置
			 */
			const rect = progressBarRef.value.getBoundingClientRect();
			const offsetWidth = e.pageX - rect.left;
			const barWidth = progressWidth.value - progressBtnWidth;
			const progress = offsetWidth / barWidth;
			emit("progress-changed", progress);
		}

		// mounted
		onMounted(async () => {
			await nextTick();
			progressWidth.value = progressBarRef.value.clientWidth;
		})

		return {
			btnStyle,
			progressRef,
			progressBarRef,
			progressWidth,
			progressStyle,
			...toRefs(touch),
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			onClickBar,
		};
	},
});
</script>

<style lang="scss" scoped>
.progress-bar {
	height: 30px;
	.bar-inner {
		position: relative;
		top: 13px;
		height: 4px;
		background: rgba(0, 0, 0, 0.3);
		.progress {
			position: absolute;
			height: 100%;
			background: $color-theme;
		}
		.progress-btn-wrapper {
			position: absolute;
			left: -8px;
			top: -13px;
			width: 30px;
			height: 30px;
			.progress-btn {
				position: relative;
				top: 7px;
				left: 7px;
				box-sizing: border-box;
				width: 16px;
				height: 16px;
				border: 3px solid $color-text;
				border-radius: 50%;
				background: $color-theme;
			}
		}
	}
}
</style>
