import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(ObserveDOM);

export const useScroll = (wrapper, options) => {
  const scroll = ref(null);

  onMounted(() => {
    scroll.value = new BScroll(wrapper.value, {
      observeDOM: true,
      ...options
    });
  })

  onUnmounted(() => {
    scroll.value.destroy();
  })
}