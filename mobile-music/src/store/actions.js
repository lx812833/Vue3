import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/util";

// 选择播放
export const selectPlay = ({ commit }, { list, index }) => {
  commit("setSequenceList", list);
  commit("setPlaylist", list);
  commit("setPlayingState", true);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setCurrentIndex", index);
  commit("setFullScreen", true);
}

// 随机播放
export const randomPlay = ({ commit }, { list }) => {
  commit("setSequenceList", list);
  commit("setPlaylist", shuffle(list));
  commit("setPlayingState", true);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setCurrentIndex", 0);
  commit("setFullScreen", true);
}