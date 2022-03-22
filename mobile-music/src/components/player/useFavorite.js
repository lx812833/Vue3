import { useStore } from "vuex";
import { computed } from "vue";
import { save } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export const useFavorite = () => {
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);
  const maxLen = 100;

  const getFavoriteIcon = (song) => {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }

  const toggleFavorite = (song) => {
    let list;
    if (isFavorite(song)) {
      // list = 
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen);
    }
    store.commit("setFavoriteList", list);

    function compare(item) {
      return item.id === song.id;
    }
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