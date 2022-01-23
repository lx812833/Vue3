<template>
	<div class="music-list">
		<div class="back" @click="handleGoBack">
			<i class="icon-back"></i>
		</div>
		<h1 class="title">{{ title }}</h1>
		<div class="bg-image" :style="bgImageStyle" ref="bgRef">
			<div class="filter"></div>
		</div>
		<scroll class="list" :style="scrollStyle" v-loading="loading">
			<div class="song-list-wrapper">
				<song-list :songs="songs"></song-list>
			</div>
		</scroll>
	</div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Scroll from "@/components/base/scroll/scroll";
import SongList from "@/components/base/songList/songList";

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
		const router = useRouter();
    const bgRef = ref(null);
    const imageHeight = ref(0);

    onMounted(() => {
      setScrollHeight();
    })

		const bgImageStyle = computed(() => {
			return {
				backgroundImage: `url(${props.pic})`,
			};
		});
		const scrollStyle = computed(() => {
			return {
				top: `${imageHeight.value}px`,
			};
		});

    // 返回
		const handleGoBack = () => {
			router.back();
		};
    // 设置滚动条top高度
    const setScrollHeight = () => {
      const h = bgRef.value && bgRef.value.clientHeight;
      imageHeight.value = h;
    }

		return {
      bgRef,
			handleGoBack,
			bgImageStyle,
			scrollStyle,
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
    padding-top: 70%;
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
