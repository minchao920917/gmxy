//app.js
var app = getApp();

App({
  data: {
    phone: '',
    uid: '',
    appId: 'wxa4eebda73bdb1d53',
    secret: 'b56e3746ee698da5c67908209a0bc279',
    oppenId: '',
    utitle:''
    //请求地址
  },

  /**
   * 服务热线
  **/
  PhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '4007108266' //仅为示例，并非真实的电话号码
    })
  }
})

