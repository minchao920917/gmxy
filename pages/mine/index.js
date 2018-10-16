// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fastnav: [{
      icon: '../../images/order.png',
      name: '我的订单',
      linkUrl: '/pages/order/index'
    }, {
      icon: '../../images/opinion.png',
      name: '意见反馈',
      linkUrl: '/pages/mycourse/index'
    }, {
      icon: '../../images/about.png',
      name: '关于我们',
      linkUrl: '/pages/us/us'
    }, {
      icon: '../../images/down.png',
      name: '下载APP',
      linkUrl: '/pages/us/us'
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
        linkUrl: '/pages/index/index'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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