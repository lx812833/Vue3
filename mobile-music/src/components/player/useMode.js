import { useStore } from "vuex";
import { computed } from "vue";
import { PLAY_MODE } from "@/assets/js/constant";

export const useMode = () => {
  const store = useStore();
  const playMode = computed(() => store.state.playMode); // 播放状态

  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : playModeVal === PLAY_MODE.random
        ? "icon-random"
        : "icon-loop"
  })

  const changeMode = () => {
    const mode = (playMode.value + 1) % 3;

    console.log("mode", mode);

    store.dispatch("changeMode", mode);
  }

  return {
    modeIcon,
    changeMode
  }
}