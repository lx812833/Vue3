import { computed, ref } from "vue";

export const useShortcut = (props, groupRef) => {
  const ANCHOR_HEIGHT = 18;
  const scrollRef = ref(null);

  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title;
    })
  })

  const touch = {}; // 两次滑动点记录

  // 点击联动
  const onShortcutTouchStart = (e) => {
    const anchorIndex = parseInt(e.target.dataset.index); // 锚点
    touch.y1 = e.touches[0].pageY;
    touch.anchorIndex = anchorIndex;

    scrollTo(anchorIndex);
  }

  // 滑动联动
  const onShortcutTouchMove = (e) => {
    touch.y2 = e.touches[0].pageY;
    const delta = Math.floor((touch.y2 - touch.y1) / ANCHOR_HEIGHT); // 偏移量
    const anchorIndex = touch.anchorIndex + delta;

    scrollTo(anchorIndex);
  }

  const onShortcutTouchEnd = () => {
  }

  // 滚动
  const scrollTo = (index) => {
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index)); // 0 ~ shortcutList.value.length - 1
    const targetEle = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEle, 0);
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    onShortcutTouchEnd
  }
}