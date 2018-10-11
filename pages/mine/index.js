// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banerImg: '../../images/baner_mine.jpg',
    fastnav: [{
      icon: '../../images/mine1.png',
      name: '我的课程',
      linkUrl: '/pages/mycourse/index'
    }, {
      icon: '../../images/mine2.png',
      name: '关于我们',
      linkUrl: '/pages/us/us'
    }, {
      icon: '../../images/mine3.png',
      name: '联系我们',
      linkUrl: '/pages/contact/contact'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})