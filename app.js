//app.js
var app = getApp();

App({
  data: {
    telicon: '../../images/icon_tel.jpg',
    //请求地址
    weburl: "https://wx.xcx.ngjjtg.com/"
  },

  /**
   * 服务热线
  */
  PhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '4007108266' //仅为示例，并非真实的电话号码
    })
  },


})

