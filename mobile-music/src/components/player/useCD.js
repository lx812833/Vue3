import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export const useCD = () => {
  const store = useStore();
  const cdRef = ref(null);
  const cdImageRef = ref(null);

  const playing = computed(() => store.state.playing);
  const cdCls = computed(() => {
    return playing.value ? "playing" : "";
  })

  watch(playing, (newVal) => {
    if (!newVal) {
      syncTransform(cdRef.value, cdImageRef.value);
    }
  })

  // 同步图片旋转角度
  const syncTransform = (wrapper, inner) => {
    const wrapperTransform = getComputedStyle(wrapper).transform;
    const innerTransform = getComputedStyle(inner).transform;
    wrapper.style.transform = wrapperTransform === "none" ? innerTransform : innerTransform.concat("", wrapperTransform);
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}