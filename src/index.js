/**
 * 
 * @param {String} key 要查询的字段值
 */
export function getQueryString(key) {
    // (^|&) 以空或者&开头
    // ([^&]*) 以不是&或者多个&开头
    // (&|$) 以空或者&结尾
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let q = window.location.search.slice(1).match(r)
    if (q !== null) {
        return q[2]
    }
    return null
}