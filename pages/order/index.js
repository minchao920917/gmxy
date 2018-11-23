// pages/order/index.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    loadingTip: "加载中...",
    page: 0,
    getDomain: util.getDomain

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.data.uid== ''){
      wx.showModal({
        title: '提示',
        content: '绑定手机号获取更多精彩内容',
  
        confirmColor: '#D1141B ',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/index'
            })
          } else if (res.cancel) {
            wx.navigateTo({
              url: '/pages/mine/index'
            })
          }
        }
      })
    }else{
      that.setData({
        page: that.data.page + 1
      })
      that.getList(that.data.page);
    }
   

  },

  /*
 * 获取视频列表
 */
  getList: function (page) {

    var that = this;
    that.setData({
      loadingTip: "加载中",
      hiddenLoading: false
    });
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/getOrderList',
      data: {
        page: page,
        uid:app.data.uid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.data.length == 0) {
          that.setData({
            loadingTip: "已加载到底部",
            hiddenLoading: false,
            page: that.data.page - 1
          });
          setInterval(function () {
            that.setData({
              hiddenLoading: true
            });
          }, 1000);
        } else {
          that.setData({
            hiddenLoading: true,
            orderList: that.data.orderList.concat(res.data.data)
          })
        }

      }
    })
  },
  /*
  * 获取更多
  */
  getScroll: function (e) {
    this.setData({
      page: this.data.page + 1,
      loadingTip: "加载中..."
    });
    this.getList(this.data.page);
  },

  scroll: function (e) {
    
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