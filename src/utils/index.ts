// 递归函数，将带有箭头函数的字符串转换成箭头函数
export const convertArrowFunctionStrings = (obj: any): any => {
  const newObj: { [key: string]: any } = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key].trim().includes('=>')) {
      try {
        newObj[key] = eval(obj[key])
      } catch (e) {
        console.error(`Error converting string to function for key: ${key}`, e)
        newObj[key] = obj[key]
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = convertArrowFunctionStrings(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
