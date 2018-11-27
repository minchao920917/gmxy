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
    getDomain: util.getDomain,
    test:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.data.uid== ''){
      wx.showModal({
        title: '提示',
        content: '您需绑定手机号成为股管家app用户，绑定后获取更多精彩内容！',
        cancelText: "先逛逛",
        confirmText: "去绑定",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/index'
            })
          } else if (res.cancel) {
            wx.navigateBack({
              delta:1
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
          if (page === 1) {
            that.setData({
              hiddenLoading: true
            });
            wx.showModal({
              title: '友情提示',
              content: '您当前订单列表为空！',
              cancelText: "返回",
              confirmText: "去购买",
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/course/index'
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
              loadingTip: "已加载到底部",
              hiddenLoading: false,
              page: that.data.page - 1
            });
            setInterval(function () {
              that.setData({
                hiddenLoading: true
              });
            }, 1000);
          }
          
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
    if(this.data.test ===1){//返回进
      this.setData({
        orderList: [],
        loadingTip: "加载中...",
        page: 0,
        getDomain: util.getDomain,
        test: 0
      })
      this.onLoad();
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // console.log(2222);
    this.setData({
      test:1
    })
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