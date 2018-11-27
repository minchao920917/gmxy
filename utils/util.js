// var domain = "http://192.168.150.53:8080";//app李亚兰的本地测试环境
var domain = "https://app.ngjjtg.com";//app线上环境
// var domain1 = "http://192.168.150.241:9000";//用户信息相关的测试环境
var domain1 = "https://xcx.ngjjtg.com/";//用户信息相关的正式环境
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getDomain: domain,
  getDomain1: domain1,
  formatTime: formatTime
}
