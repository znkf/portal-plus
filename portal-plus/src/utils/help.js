// 驼峰  下划线  互相转换
// @params: isTrue  是否转换成驼峰；
// @params: name<string> 字符串名称；
export const toHumpLine = (name, isTrue) => {
  // 下划线转换驼峰
  function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase()
    })
  }
  // 驼峰转换下划线
  function toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
  if (isTrue) {
    return toHump(name)
  } else {
    return toLine(name)
  }
}

// 数组内的对象的key转换成驼峰；
function _arrayKeyToHump(arr, isTrue = true) {
  return arr.map(item => {
    if (item && Array.isArray(item)) {
      item = _arrayKeyToHump(item, isTrue)
    } else if (item && typeof item === 'object') {
      item = _objectKeyToHump(item, isTrue)
    }
    return item === null ? '' : item
  })
}

// 对象内的key转换成驼峰；
function _objectKeyToHump(obj, isTrue = true) {
  const itemCopy = {}
  for (const key in obj) {
    let value = obj[key]
    if (value && Array.isArray(value)) {
      value = _arrayKeyToHump(value, isTrue)
    } else if (value && typeof value === 'object') {
      value = _objectKeyToHump(value, isTrue)
    }
    itemCopy[toHumpLine(key, isTrue)] = value === null ? '' : value
  }
  return itemCopy
}

// 对象内的key首字母小写大写转换；
export const firstLetterTrun = (str, isTrue = true) => {
  if (isTrue) {
    return str.replace(str[0], str[0].toLowerCase())
  }
  return str.replace(str[0], str[0].toUpperCase())
}

// 数组内的对象的key首字母大小写转换；
function _arrayKeyToFirstLetterTrun(arr, isTrue = true) {
  if (!Array.isArray(arr)) {
    return arr
  }
  return arr.map(item => {
    if (item && Array.isArray(item)) {
      item = _arrayKeyToFirstLetterTrun(item, isTrue)
    } else if (item && typeof item === 'object') {
      item = _objectKeyToFirstLetterTrun(item, isTrue)
    }
    return item === null ? '' : item
  })
}
// 对象内的key首字母大小写转换；
function _objectKeyToFirstLetterTrun(obj, isTrue = true) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj === null) {
    return obj
  }
  const itemCopy = {}
  for (const key in obj) {
    let value = obj[key]
    if (value && Array.isArray(value)) {
      value = _arrayKeyToFirstLetterTrun(value, isTrue)
    } else if (value && typeof value === 'object') {
      value = _objectKeyToFirstLetterTrun(value, isTrue)
    }
    itemCopy[firstLetterTrun(key, isTrue)] = value === null ? '' : value
  }
  return itemCopy
}
// 字符串转换大小写
export const strFirstLetterTrun = (str, isTrue) => {
  return str.replace(/[A-Za-z0-9]+/g, function(word) {
    if (isTrue) {
      return word.replace(word[0], word[0].toLowerCase())
    } else {
      return word.replace(word[0], word[0].toUpperCase())
    }
  })
}

// 对象内的key首字母大小写转换；
function _objectKeyToStrFirstLetterTrun(obj, isTrue = true) {
  const itemCopy = {}
  for (const key in obj) {
    let value = obj[key]
    if (value && Array.isArray(value)) {
      value = _arrayKeyToStrFirstLetterTrun(value, isTrue)
    } else if (value && typeof value === 'object') {
      value = _objectKeyToStrFirstLetterTrun(value, isTrue)
    }
    // if (value && typeof value === 'string') {
    //   value = value;
    // }
    itemCopy[firstLetterTrun(key, isTrue)] = value === null ? '' : value
  }
  return itemCopy
}

// 数组内的对象的key首字母大小写转换；
function _arrayKeyToStrFirstLetterTrun(arr, isTrue = true) {
  return arr.map(item => {
    if (item && Array.isArray(item)) {
      item = _arrayKeyToStrFirstLetterTrun(item, isTrue)
    } else if (item && typeof item === 'object') {
      item = _objectKeyToStrFirstLetterTrun(item, isTrue)
    }
    return item === null ? '' : item
  })
}

export const arrayKeyToHump = _arrayKeyToHump
export const objectKeyToHump = _objectKeyToHump
export const arrayKeyToFirstLetterTrun = _arrayKeyToFirstLetterTrun
export const objectKeyToFirstLetterTrun = _objectKeyToFirstLetterTrun
export const objectKeyToStrFirstLetterTrun = _objectKeyToStrFirstLetterTrun
export const arrayKeyToStrFirstLetterTrun = _arrayKeyToStrFirstLetterTrun
