import { PLAY_MODE } from "@/assets/js/constant";

// 选择播放
export const selectPlay = ({ commit }, { list, index }) => {
  commit("setSequenceList", list);
  commit("setPlaylist", list);
  commit("setPlayingState", true);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setCurrentIndex", index);
  commit("setFullScreen", true);
}