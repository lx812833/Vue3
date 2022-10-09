import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { getLyric } from "@/server/song";
import Lyric from "lyric-parser";

export const useLyric = () => {
  const store = useStore();
  const currentLyric = ref(null);

  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newVal) => {
    if (!newVal.url || !newVal.id) {
      return;
    }
    currentLyric.value = null;
    const lyric = await getLyric(newVal);
    store.commit("addSongLyric", {
      song: newVal,
      lyric
    })
    if (currentSong.value.lyric !== lyric) {
      return;
    }
    currentLyric.value = new Lyric(lyric, handleLyric);
    console.log("歌词", lyric);
  })


  // 处理歌词
  const handleLyric = () => {

  }

  return {
    currentLyric
  }
}