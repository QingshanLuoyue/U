/**
 * description 获取 url 查询参数
 * @param {String} key 要查询的字段值
 */
export function getQueryString(key) {
    // (^|&) 以空或者&开头
    // ([^&]*) 以不是&或者多个&开头
    // (&|$) 以空或者&结尾
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let q = window.location.search.slice(1).match(reg)
    return q ? decodeURIComponent(q[2]) : null
}

/**
 * description 小于10 则加前缀0函数
 * @param {Number} num
 * return 字符串
 */
export function zero(num) {
    return num < 10 ? '0' + num : num
}

/**
 * description 传入日期对象，返回字符串年月日 如 20180313 / 2018/03/13
 * @param {Date} t 日期对象
 * @param {String} symbol 间隔符号，默认为空
 * return 字符串
 */
export function ymdFormat(t, symbol = '') {
    return '' + t.getFullYear() + symbol + zero(t.getMonth() + 1) + symbol + zero(t.getDate())
}

/**
 * description 传入日期对象  返回格式化的时分  如 06:30
 * @param {Date} t 日期对象
 * @param {Boolean} boundary 布尔值，是否将 00:00 转换成 24:00
 */
export function hmFormat(t, boundary) {
    let h = '' + zero(t.getHours())
    let m = '' + zero(t.getMinutes())
    h = h === '00' && boundary && m === '00' ? '24' : h
    return h + ':' + m
}
/**
 * description 获取列表 list 中第一个符合函数 f 条件的元素
 * @param {Array} list 数组元素列表
 * @param {Function} f 过滤函数
 * @return 返回第一个符合条件的元素
 */
export function find(list, f) {
    // @ts-ignore
    return list.filter(f)[0]
}
/**
 * description 深拷贝一个对象
 * @param {Object} obj 需要拷贝的对象
 * @param {Array} cache 是否循环引用
 */
export function deepCopy(obj, cache = []) {
    // 为空或者不是对象则返回原 obj
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // 若是循环结构，则返回之前对象的 copy，而不是引用
    const hit = find(cache, (c) => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy,
    })

    Object.keys(obj).forEach((key) => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}
/**
 * description 注册事件
 * @param {HTMLElement} element html 元素
 * @param {String} event 事件名
 * @param {Function} handler 事件处理函数
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * description 删除事件
 * @param {HTMLElement} element html 元素
 * @param {String} event 事件名
 * @param {Function} handler 事件处理函数
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * description 注册仅执行一遍的事件，执行后自行删除
 * @param {HTMLElement} element html 元素
 * @param {String} event 事件名
 * @param {Function} handler 事件处理函数
 */
export const once = function (element, event, handler) {
    const listener = function () {
        if (handler) {
            handler.apply(this, arguments)
        }
        off(element, event, listener)
    }
    on(element, event, listener)
}
