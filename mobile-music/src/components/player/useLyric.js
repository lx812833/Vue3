import { useStore } from "vuex";
import { computed, watch } from "vue";
import { getLyric } from "@/server/song";

export const useLyric = () => {
  const store = useStore();

  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newVal) => {
    if (!newVal.url || !newVal.id) {
      return;
    }
    const lyric = await getLyric(newVal);
    console.log("歌词", lyric);
  })

  return {
    
  }
}