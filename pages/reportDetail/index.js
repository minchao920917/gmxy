// pages/reportDetail/index.js
// newdetail.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    author: '',
    desc: '',
    content: '',
    create_time: '',
    view: '',
    getDomain: util.getDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //请求页面详细数据
    var that = this;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/reportIndexDetail',
      data: {
        r_id: options.id,
        uid:app.data.uid,
        domain: util.getDomain
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var str = res.data.data.content;
        var imgStr = "<img width='100%' height = 'auto'";
        var urlStr = util.getDomain+"/uploads";
        str = str.replace(/\/uploads/g, urlStr);
        that.setData({
          title: res.data.data.title,
          content: str.replace(/<img/g, imgStr),
          author: res.data.data.author,
          view: res.data.data.click
        });
        //获取页面来源的ID
        var pageid = res.data.data.id;

        //取出缓存页面的ID
        wx.getStorage({
          key: 'newid',
          success: function (res) {
            pageid += ',' + res.data;
          }
        });

        setTimeout(function () {
          wx.setStorage({
            key: "newid",
            data: pageid
          })
        }, 100)

      }
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})