import { ref } from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null); // T 或 null 联合类型
  const loading = ref<boolean>(true);
  const loaded = ref<boolean>(false);
  const error = ref<T | null>(null);

  axios.get(url).then(res => {
    loading.value = false;
    loaded.value = true;
    result.value = res.data;
  }).catch(err => {
    loading.value = false;
    error.value = err;
  })

  return {
    result, loading, loaded, error
  }
}

export default useURLLoader