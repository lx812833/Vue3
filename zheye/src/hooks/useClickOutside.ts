import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (eleRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref<boolean>(false);
  const handler = (e: MouseEvent) => {
    if (eleRef.value) {
      if (eleRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handler);
  })
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  })
  return isClickOutside;
}

export default useClickOutside;