import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from './hooks/testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "lx" };
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(item => item.id === id);
    },
    getPostsById: (state) => (id: number) => {
      return state.posts.filter(item => item.columnId === id);
    }
  }
})

export default store;