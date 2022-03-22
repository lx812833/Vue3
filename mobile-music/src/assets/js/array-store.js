import storage from "good-storage";

// 处理数据
const inertArray = (arr, val, compare, maxLen) => {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export const save = (item, key, compare, maxLen) => {
  const items = storage.get(key, []);
  inertArray(items, item, compare, maxLen);
  storage.set(key, items);
  return items;
}