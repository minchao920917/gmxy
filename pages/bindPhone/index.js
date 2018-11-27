// pages/bindPhone/index.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDomain1: util.getDomain1,
    msg:'发送验证码',
    count:0,
    phone:'',
    code:'',
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  send:function(){
    var that = this;
    if (!that.data.timer) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }

    wx.request({
      method: 'POST',
      url: util.getDomain1 + '/wxxcx/xcxapi/sendMsg',
      data: {
        phone: that.data.phone,
        type:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        if (res.data.code === 0){
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
          
            var TIME_COUNT = 60;
            that.data.count = TIME_COUNT;
            that.data.timer = setInterval(() => {
              if (that.data.count > 0 && that.data.count <= TIME_COUNT) {
                that.data.count--;
                that.setData({
                  count: that.data.count--
                })

              } else {
                clearInterval(that.data.timer)
                that.data.timer = null
              }
            }, 1000)
          
        }
        
      }
      
    })

    } else {
      wx.showToast({
        title: '稍后重发',
        icon: 'loading',
        duration: 1500
      })
    }
  },
  mobileInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindPhone:function(){
    var that = this;
    var codeReg = /^\d{6}$/;
    if (!codeReg.test(that.data.code)) {
      wx.showToast({
        title: '验证码格式不对!',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    wx.request({
      method: 'POST',
      url: util.getDomain1 + '/wxxcx/xcxapi/checkCode',
      data: {
        phone: that.data.phone,
        code:that.data.code,
        openid: app.data.oppenId,
        type: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        if (res.data.code == 1) {
          
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/index/index'
            })
          }, 2000)
         
        }
       
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

  }
})