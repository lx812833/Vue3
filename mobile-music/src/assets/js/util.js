/**
 * 洗牌函数
 */

export const shuffle = (source) => {
  const array = source.slice(); // 深拷贝
  for (let i = 0, len = array.length; i < len; i++) {
    const j = getRandomInt(i);
    swap(array, i, j);
  }
  return array;
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1)); // [0, max]
}

const swap = (arr, i, j) => {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}