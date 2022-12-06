/**
 * 设置node环境中可以使用定义的环境变量
 * @param {*} envOptions 
 * @returns 
 */
export function wrapperEnv(envOptions) {
  if (!envOptions) return {}
  const rst = {};

  for (const key in envOptions) {
    let val = envOptions[key]
    if (['true', 'false'].includes(val)) {
      val = val === 'true';
    }
    if (['VITE_PORT'].includes(key)) {
      val = +val;
    }
    if (key === 'VITE_PROXY' && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'));
      } catch (error) {
        val = '';
      }
    }
    rst[key] = val
    if (typeof key === 'string') {
      process.env[key] = val;
    } else if (typeof key === 'object') {
      process.env[key] = JSON.stringify(val);
    }
  }
  return rst;
}