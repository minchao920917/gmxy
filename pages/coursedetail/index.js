// pages/coursedetail/index.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDomain: util.getDomain,
    vo: {},
    voindex: 0,
    voList: [],
    total: 0,
    totalShow: 1,
    isPaly: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("pid是" + options.pid);
    //请求页面详细数据
    var that = this;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/videoIndexDetail',
      data: {
        uid: app.data.uid,
        v_id: options.pid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if (options.id) {//从免费的进
          for (var a in res.data.data.list) {
            if (options.id == res.data.data.list[a].id){
              that.setData({
                voindex:a
              })
           }
          }
        }
        that.setData({
          voList: res.data.data.list,
          vo: res.data.data.list[that.data.voindex],
          total: res.data.data.total.money,
          totalShow: res.data.data.total.is_show
        });
      }
    })

    that.videoContext = wx.createVideoContext('myVideo');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  play: function(e) {
    console.log(e.currentTarget.dataset.is_payed);
    if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
      console.log(111);
    }else{
      if (this.data.isPaly) {

      } else {
        this.videoContext.play();
        this.setData({
          isPaly: !this.data.isPaly,
        })
      }
    }
    
  },
  playVideo: function(e) {
    if (e.currentTarget.dataset.is_payed === 1) { //如果已经解锁
      if (this.data.isPaly) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
      this.setData({
        isPaly: !this.data.isPaly
      })
    } else if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
      this.setData({
        isPaly: !this.data.isPaly
      })
    }
  },
  bf2video: function(e) {
    if (e.currentTarget.dataset.is_payed === 1) { //如果已经解锁
      this.setData({
        voindex: e.currentTarget.dataset.index,
        vo: this.data.voList[e.currentTarget.dataset.index]
      })
      wx.setNavigationBarTitle({
        title: this.data.vo.title
      })
    } else if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
    }
  },

  pay2money:function(e){
    console.log(e)
    // wx.requestPayment(
    //   {
    //     'timeStamp': Date.parse(new Date())/1000,
    //     'nonceStr': 'sss',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) {
    //       console.log();
    //      },
    //     'complete': function (res) { }
    //   })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})