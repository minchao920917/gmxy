//index.js
var util = require('../../utils/util.js');
Page({
  data: {
    curr_id: '',
    hiddenLoading: false,
    loadingTip: "加载中...",
    page: 0,
    playIndex: -1,
    getDomain: util.getDomain,
    videoList: [],
    isPaly: false
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  videoPlay(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/addVedioClick',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          curr_id: e.currentTarget.dataset.id,
        })
        that.videoContext.play()

      }
    })


  },
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
        } else {
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
    // this.setData({
    //   curr_id:' '
    // })
  },

  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1,
      loadingTip: "加载中..."
    });
    this.getList(this.data.page);
  }
})
