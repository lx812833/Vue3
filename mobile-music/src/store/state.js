import { PLAY_MODE, FAVORITE_KEY } from "@/assets/js/constant";
import { load } from "@/assets/js/array-store";

export const state = {
  sequenceList: [], // 顺序列表
  playlist: [], // 播放列表
  playing: false, // 是否播放
  playMode: PLAY_MODE.sequence, // 播放模式 
  currentIndex: 0,
  fullScreen: false, // 是否全屏
  favoriteList: load(FAVORITE_KEY), // 收藏列表
}