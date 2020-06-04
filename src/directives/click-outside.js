const nodeList = []
const ctx = 'customer_clickoutsideContext'
let seed = 0

const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

on(document, 'click', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e))
})

function createDocumentHandler(el, binding, vnode) {
  return function(event = {}) {
    if (!vnode ||
      !vnode.context ||
      !event.target ||
      el.contains(event.target) ||
      el === event.target) return

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

export default {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  // update(el, binding, vnode) {
  //   console.log('directive update')
  //   el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
  //   el[ctx].methodName = binding.expression
  //   el[ctx].bindingFn = binding.value
  // },

  unbind(el) {
    let len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
