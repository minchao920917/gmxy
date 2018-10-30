// pages/course/index.js
//获取应用实例
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:false,
    getDomain: util.getDomain,
    vpage:0,
    rpage:1,
    vfreeList:[],
    vList:[],
    currentTab: 0
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    this.getV();
  },

  getV:function(){

    var that = this;
    that.setData({
      hiddenLoading: false
    })
    that.data.vpage += 1;
    console.log(that.data.vpage);
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/vedioIndex',
      data: {
        page: that.data.vpage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log(res.data);
        that.setData({
          hiddenLoading: true,
          vfreeList: res.data.data.free_list,
          vList: that.data.vList.concat(res.data.data.list)
        });

      }
    })
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
  getMore:function(){
    console.log("继续加载");
    this.getV();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})