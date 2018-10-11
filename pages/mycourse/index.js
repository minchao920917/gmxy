// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseData: [],
    havenone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //取出缓存页面的ID
    wx.getStorage({
      key: 'newid',
      success: function (res) {
        wx.request({
          url: app.data.weburl + 'api/article/mylists',
          data: {
            ids: res.data
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              courseData: res.data.data
            });

            wx.setStorage({
              key: "newid",
              data: res.data.list_ids
            });
          }
        })
      },

      fail: function (res) {
        that.setData({
          havenone: true
        });
      }

    })


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