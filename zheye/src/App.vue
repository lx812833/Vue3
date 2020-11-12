<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";

const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
    title: "title1",
    description: "desc1",
  },
  {
    id: 2,
    avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
    title: "title2",
    description: "desc2",
  },
  {
    id: 3,
    avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
    title: "title3",
    description: "desc3",
  },
  {
    id: 4,
    avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
    title: "title4",
    description: "desc4",
  },
];
const currentUser: UserProps = {
  isLogin: true,
  name: "lx"
}

export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader
  },
  setup() {
    return {
      list: testData,
      user: currentUser
    }
  }
});
</script>