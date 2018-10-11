// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banerImg: '../../images/baner_calendar.jpg',
    today: '',
    today_count: '',
    listdata: [],
    havenone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.data.weburl + 'api/stock/lists',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var datas = res.data.data;

        that.setData({
          today: datas.today,
          today_count: datas.today_count,
          listdata: res.data.data.list
        });

        if (res.data.status === 0) {
          that.setData({
            havenone: true
          });
        };

      }
    })
  },



 



 


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})