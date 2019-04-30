/**
 * 
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
    return num < 10 ? ('0' + num) : num
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
    h = (h === '00' && boundary && m === '00') ? '24' : h
    return h + ':' + m
}