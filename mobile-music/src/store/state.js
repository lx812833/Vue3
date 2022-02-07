import { PLAY_MODE } from "@/assets/js/constant";

export const state = {
  sequenceList: [], // 顺序列表
  playlist: [], // 播放列表
  playing: false, // 是否播放
  playMode: PLAY_MODE.sequence, // 播放模式 
}