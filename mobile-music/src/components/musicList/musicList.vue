<template>
	<div class="music-list">
		<div class="back" @click="handleGoBack">
			<i class="icon-back"></i>
		</div>
		<h1 class="title">{{ title }}</h1>
		<div class="bg-image" :style="bgImageStyle" ref="bgRef">
			<div class="play-btn-wrapper" :style="playBtnStyle">
				<div	v-show="songs.length > 0"	class="play-btn" @click="selectRandomPlay">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" :style="filterStyle"></div>
		</div>
		<scroll
			class="list"
			:style="scrollStyle"
			v-loading="loading"
			v-no-result:[noResultText]="noResult"
			:probe-type="3"
			@scroll="onScroll"
		>
			<div class="song-list-wrapper">
				<song-list :songs="songs" @select="selectPlayItem"></song-list>
			</div>
		</scroll>
	</div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Scroll from "@/components/base/scroll/scroll";
import SongList from "@/components/base/songList/songList";
const HEADER_HEIGHT = 40; // 顶部header高度

export default defineComponent({
	name: "MusicList",
	components: {
		Scroll,
		SongList,
	},
	props: {
		songs: {
			type: Array,
			default() {
				return [];
			},
		},
		title: {
			type: String,
		},
		pic: {
			type: String,
		},
		loading: {
			type: Boolean,
		},
		noResultText: {
			type: String,
			default: "抱歉，没有找到可播放的歌曲",
		},
		rank: {
			type: Boolean,
		},
	},
	setup(props) {
		const router = useRouter(); // vue3中router使用方法
		const store = useStore(); // vue3中vuex使用方法
		const bgRef = ref(null);
		const imageHeight = ref(0);
		const scrollY = ref(0);
		const maxTranslateY = ref(0);

		onMounted(() => {
			setScrollHeight();
		});

		const bgImageStyle = computed(() => {
			let zIndex = 0;
			let paddingTop = "70%";
			let height = 0;
			let scale = 1;
			let translateZ = 0;

			if(scrollY.value > maxTranslateY.value) {
				zIndex = 10;
				paddingTop = 0;
				height = `${HEADER_HEIGHT}px`;
				translateZ = 1;
			}
			// scroll向下滚动，图片伸缩
			if (scrollY.value < 0) {
				scale = 1 + Math.abs(scrollY.value / imageHeight.value);
			}

			return {
				height,
				paddingTop,
				zIndex,
				backgroundImage: `url(${props.pic})`,
				transform: `scale(${scale})translateZ(${translateZ}px)`,
			};
		});
		const scrollStyle = computed(() => {
			return {
				top: `${imageHeight.value}px`,
			};
		});
		const filterStyle = computed(() => {
			let blur = 0;
      if(scrollY.value >= 0) {
        blur = Math.min(maxTranslateY.value / imageHeight.value, scrollY.value / imageHeight.value) * 10;
			}

			return {
				backdropFilter: `blur(${blur}px)`,
			};
		});
		const playBtnStyle = computed(() => {
			let display = "";
			if (scrollY.value >= maxTranslateY.value) {
				display = "none";
			}
			return {
				display,
			};
		});
		const noResult = computed(() => {
			return !props.loading && !props.songs.length;
		});

		// 返回
		const handleGoBack = () => {
			router.back();
		};
		// 设置滚动条top高度
		const setScrollHeight = () => {
			const h = bgRef.value && bgRef.value.clientHeight;
			imageHeight.value = h;
			// 最大滚动高度
			maxTranslateY.value = h - HEADER_HEIGHT;
		};
		// scroll滚动事件
		const onScroll = (pos) => {
			scrollY.value = -pos.y;
		};
		// 选择播放的歌曲
		const selectPlayItem = ({ index }) => {
			store.dispatch("selectPlay", {
				list: props.songs,
				index,
			});
		};
		// 选择随机播放歌曲
		const selectRandomPlay = () => {
			store.dispatch("randomPlay", {
				list: props.songs,
			});
		};

		return {
			bgRef,
			handleGoBack,
			bgImageStyle,
			scrollStyle,
			filterStyle,
			playBtnStyle,
			onScroll,
			noResult,
			selectPlayItem,
			selectRandomPlay,
		};
	},
});
</script>

<style lang="scss" scoped>
.music-list {
	position: relative;
	height: 100%;
	.back {
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 20;
		transform: translateZ(2px);
		.icon-back {
			display: block;
			padding: 10px;
			font-size: $font-size-large-x;
			color: $color-theme;
		}
	}
	.title {
		position: absolute;
		top: 0;
		left: 10%;
		width: 80%;
		z-index: 20;
		transform: translateZ(2px);
		@include no-wrap();
		text-align: center;
		line-height: 40px;
		font-size: $font-size-large;
		color: $color-text;
	}
	.bg-image {
		position: relative;
		width: 100%;
		transform-origin: top;
		background-size: cover;
		.play-btn-wrapper {
			position: absolute;
			bottom: 20px;
			z-index: 10;
			width: 100%;
			.play-btn {
				box-sizing: border-box;
				width: 135px;
				padding: 7px 0;
				margin: 0 auto;
				text-align: center;
				border: 1px solid $color-theme;
				color: $color-theme;
				border-radius: 100px;
				font-size: 0;
			}
			.icon-play {
				display: inline-block;
				vertical-align: middle;
				margin-right: 6px;
				font-size: $font-size-medium-x;
			}
			.text {
				display: inline-block;
				vertical-align: middle;
				font-size: $font-size-small;
			}
		}
		.filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(7, 17, 27, 0.4);
		}
	}
	.list {
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 0;
		.song-list-wrapper {
			padding: 20px 30px;
			background: $color-background;
		}
	}
}
</style>
