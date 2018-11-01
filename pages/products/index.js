// pages/products/index.js
//获取应用实例
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    getDomain: util.getDomain,
    getDomain1: util.getDomain1,
    teacher_list:[],
    product_list:[],
    teacherInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.getproductlist();
  },

  /*
  * 获取数据
  */
  getList: function(){
    var that = this;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/vedioIntroduction',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          teacher_list: res.data.data.teacher_list,
        })
      }
    })
  },

  getproductlist: function () {
    var that = this;
    wx.request({
      method: 'POST',
      url: util.getDomain1 + '/wxxcx/getproductlist',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          product_list: res.data.data
        })
      }
    })
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

  },
  /**
     * 弹窗
     */
  showDialogBtn: function (e) {
    var that =this;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/getTeacherInfo',
      data: {
        tid: e.currentTarget.dataset.teacher
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          teacherInfo: res.data.data
        })
      }
    })
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  }
})