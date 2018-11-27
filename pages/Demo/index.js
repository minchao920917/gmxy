// pages/videos/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: false,
    loadingTip: "加载中...",
    page:0,
    playIndex:-1,
    getDomain: util.getDomain,
    videoList:[],
    isPaly: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.getList(that.data.page)
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
      url: util.getDomain + '/wxxcx/index/getVedioList',
      data: {
        page: page
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
        } else{
          that.setData({
            hiddenLoading: true,
            videoList: that.data.videoList.concat(res.data.data)
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
    if (this.videoContext) {
      this.videoContext.pause();
    }
    this.setData({
      playIndex:-1
    })
  },

  //播放视频
  PlayVoid: function (e) {
    var that =this;
    var id = e.currentTarget.dataset.videoid.split("-")[1];
    var vId = e.currentTarget.dataset.vid;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/addVedioClick',
      data: {
        id: vId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          playIndex: id
        })
        if (that.videoContext) {
          that.videoContext.pause();
        }

        that.videoContext = wx.createVideoContext(e.currentTarget.dataset.videoid);
        that.videoContext.play();
        
      }
    })


  },
  //videoErrorCallback
  videoErrorCallback: function (e) {
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.videoContext.pause();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})