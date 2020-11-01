<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <h2>{{ double }}</h2>
    <button @click="increase">赞+1</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  ref,
  toRefs,
  onMounted,
  onUpdated,
  watch,
} from "vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
interface Person {
  name: string;
  age: number;
}

export default defineComponent({
  name: "HelloWorld",
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    // 不使用reactive
    // const count = ref(0);
    // const double = computed(() => {
    //   return count.value * 2;
    // });
    // const increase = () => {
    //   count.value++;
    // };
    // return {
    //   count,
    //   double,
    //   increase,
    // };

    // 使用reactive
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => {
        // age.value++; // 不使用reactive时需用 .value 获取其值
        data.count++;
      },
    });

    // watch监听单个值
    // const age = ref<number>(18);
    // watch(age, (newVal, oldVal) => {
    //   console.log("newVal", newVal, "oldVal", oldVal);
    // });

    // watch监听多个值
    const state = reactive<Person>({ name: "vue", age: 10 });
    watch(
      [() => state.age, () => state.name],
      ([newName, newAge], [oldName, oldAge]) => {
        console.log(newName);
        console.log(newAge);

        console.log(oldName);
        console.log(oldAge);
      }
    );
    setTimeout(() => {
      stop(); // 此时修改时, 不会触发watch 回调
      state.age = 1000;
      state.name = "vue3-";
    }, 1000); // 1秒之后讲取消watch的监听

    const refData = toRefs(data);
    return {
      ...refData,
      // age,
      ...toRefs(state),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
