import { createStore } from "vuex";
import { testData, testPosts, ColumnProps } from './hooks/testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number,
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export interface ImageProps {
  id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface PostProps {
  id?: number;
  columnId?: number;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column?: string;
  author?: string | UserProps;
  isHTML?: boolean;
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
      state.user = { ...state.user, isLogin: true, name: "lx", columnId: 1 };
    },
    createPost(state, post) {
      console.log("没执行？");
      state.posts.push(post);
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