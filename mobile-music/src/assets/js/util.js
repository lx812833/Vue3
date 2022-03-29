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

export const formatTime = (interval = 0) => {
  interval = interval | 0; // 取整
  const minute = ((interval / 60 | 0) + "").padStart(2, "0"); // 字符串补全
  const second = (interval % 60 + "").padStart(2, "0");
  return `${minute}:${second}`;
}