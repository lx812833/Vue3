export const mutations = {
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  setPlaylist(state, list) {
    state.playlist = list;
  },
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  setFavoriteList(state, list) {
    state.favoriteList = list;
  },
  addSongLyric(state, { song, lyric }) {
    state.sequenceList.map(item => {
      if (item.mid === song.id) {
        item.lyric = lyric;
      }
      return item;
    })
  }
}