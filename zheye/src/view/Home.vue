<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import ColumnList, { ColumnProps } from "../components/ColumnList.vue";

export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    const list: ColumnProps[] = [
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
    return {
      list
    }
  },
});
</script>

<style>
</style>