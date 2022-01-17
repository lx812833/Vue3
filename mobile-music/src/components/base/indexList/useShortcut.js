import { computed, ref } from "vue";

export const useShortcut = (props, groupRef) => {
  const scrollRef = ref(null);

  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title;
    })
  })

  // 点击联动
  const onShortcutTouchStart = (e) => {
    const anchorIndex = parseInt(e.target.dataset.index); // 锚点
    const targetEle = groupRef.value.children[anchorIndex];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEle, 0);
  }

  const onShortcutTouchMove = () => {
  }

  const onShortcutTouchEnd = () => {
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    onShortcutTouchEnd
  }
}