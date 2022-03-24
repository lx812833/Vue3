import { useStore } from "vuex";
import { computed } from "vue";
import { save, remove } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export const useFavorite = () => {
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);
  const maxLen = 100;

  const getFavoriteIcon = (song) => {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }

  const toggleFavorite = (song) => {
    /**
     * 
     * arr.findIndex(callback[, thisArg])
     * findIndex接收一个回调函数，函数第一个参数为当前元素，item 
     */
    const compare = (item) => {
      return item.id === song.id;
    }
    let list;
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare);
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen);
    }
    store.commit("setFavoriteList", list);
  }

  const isFavorite = (song) => {
    return favoriteList.value.findIndex(item => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}