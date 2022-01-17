import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(ObserveDOM);

export const useScroll = (wrapper, options, emit) => {
  const scroll = ref(null);

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapper.value, {
      observeDOM: true,
      ...options
    });

    // 监听实时滚动事件
    if(options.probeType > 0) {
      scrollVal.on("scroll", (pos) => {
        emit("scroll", pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy();
  })

  return scroll;
}