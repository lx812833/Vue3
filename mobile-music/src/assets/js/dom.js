/**
 * classList：属性返回元素的类名，作为 DOMTokenList 对象
 * contains：返回布尔值，判断指定的类名是否存在
 * 使用 add() 和 remove() 方法修改它
 */

export const addClass = (el, className) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

export const removeClass = (el, className) => {
  el.classList.remove(className);
}