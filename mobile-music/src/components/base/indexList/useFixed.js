import { ref, watch, nextTick, computed } from "vue";

export const useFixed = (props) => {
  const TITLE_HEIGHT = 30;
  const groupRef = ref(null);
  const listHeights = ref([]);
  const scrollY = ref(0);
  const currentIndex = ref(0); // 当前渲染索引
  const distance = ref(0); // 区间底部距最顶部的间隔

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    // 偏移量
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0;
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  watch(() => props.data, async () => {
    await nextTick(); // DOM渲染完成后获取分组高度列表
    calculate();
  })

  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value;
    for (let i = 0, len = listHeightsVal.length - 1; i < len; i++) {
      const heightTop = listHeightsVal[i];
      const heightBottom = listHeightsVal[i + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i;
        distance.value = heightBottom - newY;
      }
    }
  })

  // 计算分组li高度
  const calculate = () => {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0; // 区间高度

    listHeightsVal.length = 0;
    listHeightsVal.push(height);
    for (let i = 0, len = list.length; i < len; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height);
    }
  }

  // 实时滚动事件
  const onScroll = (val) => {
    scrollY.value = -val.y;
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex,
    shortcutList: []
  }
}