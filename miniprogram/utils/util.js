const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
const requestPromise = myUrl => {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
  wx.request({
  url: myUrl,
  method:'GET',
  success: res => resolve(res),
  fail:err=> reject(err)
  })
  })
 }
 // 我把这个函数放在了utils.js中，这样在需要时可以直接引入

module.exports = {
  requestPromise:requestPromise,
  formatTime: formatTime
}
