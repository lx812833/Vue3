import { ref, onMounted, onUnmounted } from "vue";

function useMousePosition() {
  const x = ref<number>(0);
  const y = ref<number>(0);
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  return { x, y }
}

export default useMousePosition