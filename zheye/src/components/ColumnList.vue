<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in list" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img class="rounded-circle border border-light w-25 my-3" :src="column.avatar" :alt="column.title" srcset="" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary" href="#">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
const DefaultAvator = require("../assets/avatar.jpg");

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      /**
       * Vue 对定义了 type 的 props 执行运行时验证,要将这些类型提供给 TypeScript，需要使用 PropType 对构造方法进行指派：
       * */
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      props.list.map((item) => {
        if (!item.avatar) {
          item.avatar = DefaultAvator;
        }
      });
    });
    console.log("props", props.list);
  },
});
</script>

<style>
</style>