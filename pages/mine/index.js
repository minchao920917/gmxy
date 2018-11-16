// index.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    userInfo: { avatarUrl: "", nickName: "" },
    phone:'',
    //操作列表
    fastnav: [{
      icon: '../../images/order.png',
      name: '我的订单',
      linkUrl: '/pages/order/index'
    },
    //  {
    //   icon: '../../images/opinion.png',
    //   name: '意见反馈',
    //   linkUrl: '/pages/mycourse/index'
    // }, 
    {
      icon: '../../images/about.png',
      name: '关于我们',
      linkUrl: '/pages/us/us'
    }, {
      icon: '../../images/down.png',
      name: '下载APP',
      linkUrl: '/pages/downApp/index'
    }, {
      icon: '../../images/phone.png',
      name: '联系我们',
      linkUrl: '/pages/contact/contact'
    }],
    navFooter: [{
        imgUrl: '../../images/index.png',
        txt: '首页',
        active: 'active',
      linkUrl: '/pages/index/index'
      },
      {
        imgUrl: '../../images/sy_my_black.png',
        txt: '我的',
        active: '',
        linkUrl: '/pages/mine/index'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phone:app.data.phone
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
     
  },
  /*
   * 拨打电话
   */
  calling: function() {
    wx.makePhoneCall({
      phoneNumber: '400-669-9618', //此号码并非真实电话号码，仅用于测试
      success: function() {

      },
      fail: function() {

      }
    })
  }
})