// contact.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banerImg: '../../images/con_baner.png',
    coninfo: [{
      icon: '../../images/con1.png',
      txt: '全国服务热线：400-7108-266'
    }, {
        icon: '../../images/con2.png',
      txt: '公司网址：www.ngjjtg.com'
    }, {
        icon: '../../images/con4.png',
        txt: '关于我们：订阅号：jyzqngjj   服务号：ygjjs888'
    }, {
        icon: '../../images/con5.png',
      txt: '办公地址：中国·苏州金阊区广济南路19号永捷峰汇25-27F（215000）'
    }],
    telicon: app.data.telicon,
    markers: {
      id: 0,
      latitude: 120.6006800000 ,
      longitude: 31.3053800000
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },

  //查看地图路线
  location:function(){
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },

  //调用服务热线
  PhoneCall: app.PhoneCall


})