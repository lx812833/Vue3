<template>
  <div class="player">
    <div class="normal-player" v-if="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" alt="" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h1 class="subtitle">{{ currentSong.singer }}</h1>
      </div>
      
      <div
				class="middle"
				@touchstart.prevent="onMiddleTouchStart"
				@touchmove.prevent="onMiddleTouchMove"
				@touchend.prevent="onMiddleTouchEnd"
			>
				<div class="middle-l" :style="middleLStyle">
					<div ref="cdWrapperRef" class="cd-wrapper">
						<div ref="cdRef" class="cd">
							<img
								ref="cdImageRef"
								class="image playing"
								:class="cdCls"
								:src="currentSong.pic"
							/>
						</div>
					</div>
					<div class="playing-lyric-wrapper">
						<div class="playing-lyric">{{ playingLyric }}</div>
					</div>
				</div>
				<scroll class="middle-r" ref="lyricScrollRef" :style="middleRStyle">
					<div class="lyric-wrapper">
						<div v-if="currentLyric" ref="lyricListRef">
							<p
								class="text"
								:class="{ current: currentLineNum === index }"
								v-for="(line, index) in currentLyric.lines"
								:key="line.num"
							>
								{{ line.txt }}
							</p>
						</div>
						<div class="pure-music" v-show="pureMusicLyric">
							<p>{{ pureMusicLyric }}</p>
						</div>
					</div>
				</scroll>
			</div>

      <div class="bottom">
        <!-- <div class="dot-wrapper">
					<span class="dot" :class="{ active: currentShow === 'cd' }"></span>
					<span class="dot" :class="{ active: currentShow === 'lyric' }"></span>
				</div>
        -->
				<div class="progress-wrapper">
					<span class="time time-l">{{ formatTime(currentTime) }}</span>
					<div class="progress-bar-wrapper">
						<progress-bar
							ref="barRef"
							:progress="progress"
							@progress-changing="onProgressChanging"
							@progress-changed="onProgressChanged"
						></progress-bar>
					</div>
					<span class="time time-r">{{ formatTime(currentSong.duration) }}</span>
				</div>
        <div class="operators">
          <div class="icon i-left">
            <i @click="changeMode" :class="modeIcon"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i @click="handlePrev" class="icon-prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i @click="handleTogglePlay" :class="playIcon"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i @click="handleNext" class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i
              @click="toggleFavorite(currentSong)"
              :class="getFavoriteIcon(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="audioPause"
      @canplay="audioReady"
      @error="audioError"
      @timeupdate="audioUpdateTime"
      @ended="audioEnded"
    ></audio>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {
  defineComponent,
  computed,
  watch,
  ref,
} from "vue";
import { useMode } from "./useMode";
import { useFavorite } from "./useFavorite";
import { useCD } from "./useCD";
import { useLyric } from "./useLyric";
import { formatTime } from "@/assets/js/util";
import progressBar from "./progressBar.vue";
import { PLAY_MODE } from "@/assets/js/constant";

export default defineComponent({
  name: "Player",
  components: {
    progressBar,
  },
  setup() {
    // data
    const audioRef = ref(null);
    const songReady = ref(false);
    const currentTime = ref(0);
    let progressChanging = false;

    // computed
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    const currentIndex = computed(() => store.state.currentIndex);
    const playlist = computed(() => store.state.playlist);
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration;
    });
    const playMode = computed(() => store.state.playMode); // 播放状态

    // hooks
    const { modeIcon, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();
    const { cdCls, cdRef, cdImageRef } = useCD();
    useLyric();

    // watch
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      currentTime.value = 0;
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
    });
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioEl = audioRef.value;
      newPlaying ? audioEl.play() : audioEl.pause();
    });

    // methods
    const goBack = () => {
      store.commit("setFullScreen", false);
    };
    // 切换播放状态
    const handleTogglePlay = () => {
      if (!songReady.value) {
        return;
      }
      store.commit("setPlayingState", !playing.value);
    };
    // 上一个
    const handlePrev = () => {
      let list = playlist.value;
      if (!songReady.value || !list.length) {
        return;
      }
      if (list.length === 1) {
        loopPlayer();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    };
    // 下一个
    const handleNext = () => {
      let list = playlist.value;
      if (!songReady.value || !list.length) {
        return;
      }
      if (list.length === 1) {
        loopPlayer();
      } else {
        let index = currentIndex.value + 1;
        if (index === playlist.value.length) {
          index = 0;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    };
    // 播放器停止播放事件
    const audioPause = () => {
      store.commit("setPlayingState", false);
    };
    // 播放器准备好播放
    const audioReady = () => {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    };
    // 播放器报错
    const audioError = () => {
      songReady.value = true;
    };
    // 播放器结束当前播放
		const audioEnded = () => {
			currentTime.value = 0;
			if (playMode.value === PLAY_MODE.loop) {
				loopPlayer();
			} else {
				handleNext();
			}
		};
    // 循环播放
    const loopPlayer = () => {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
			store.commit("setPlayingState", true);
    };
		// 播放器播放进度
		const audioUpdateTime = (e) => {
			if (!progressChanging) {
				currentTime.value = e.target.currentTime;
			}
		};
		// 滑动进度条中
		const onProgressChanging = (progress) => {
      progressChanging = true;
			currentTime.value = currentSong.value.duration * progress;
		};
		// 滑动进度条结束
		const onProgressChanged = (progress) => {
      progressChanging = false;
			audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress;
			if (!playing.value) {
				store.commit("setPlayingState", true);
			}
		};

    const onMiddleTouchStart = () => {

    };

    const onMiddleTouchMove = () => {

    };

    const onMiddleTouchEnd = () => {

    };

    const middleLStyle = ref("");
    const cdWrapperRef = ref(null);
    const lyricScrollRef = ref(null);
    const lyricListRef = ref(null);
    const playingLyric = ref("");
    const middleRStyle = ref("");
    const currentLyric = ref({});
    const currentLineNum = ref("");

    return {
      audioRef,
      fullScreen,
      currentSong,
      currentTime,
      playIcon,
      disableCls,
      progress,
      goBack,
      audioPause,
      audioReady,
      audioError,
      audioEnded,
      audioUpdateTime,
      handleTogglePlay,
      handlePrev,
      handleNext,
      modeIcon,
      changeMode,
      toggleFavorite,
      getFavoriteIcon,
      formatTime,
      onProgressChanging,
      onProgressChanged,
      // cd
      cdCls,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      middleLStyle,
      cdWrapperRef,
      cdRef,
      cdImageRef,
      lyricScrollRef,
      lyricListRef,
      playingLyric,
      middleRStyle,
      currentLyric,
      currentLineNum,
    };
  },
});
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
