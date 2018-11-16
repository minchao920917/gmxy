// index.js
//获取应用实例
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    hiddenLoading: false,
    loadingTip: "加载中",
    scrollTop: 0,
    getDomain: util.getDomain,
    page: 1,
    listdata: [],
    havenone: false
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.getList(this.data.page);
  },


  getList: function (page) {
    var that = this;
    that.setData({
      hiddenLoading: false
    })
    // console.log("视频第" + page + "页");
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/getHotArticleList',
      data: {
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
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
          }, 2000);
        } else {
          that.setData({
            hiddenLoading: true,
            listdata: that.data.listdata.concat(res.data.data)
          });

        }
      }
    })
  },

  //滚动底部触发事件
  lower: function () {
    this.setData({
      page: this.data.page + 1,
      loadingTip: "加载中..."
    });
    this.getList(this.data.page);
  },







	/**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () { }

})