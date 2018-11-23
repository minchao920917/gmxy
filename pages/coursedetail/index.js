// pages/coursedetail/index.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDomain: util.getDomain,
    vo: {},
    voindex: 0,
    voList: [],
    total: 0,
    totalShow: 1,
    total_pid:'',
    isPaly: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      total_pid: options.pid
    });
    //请求页面详细数据
    var that = this;
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/videoIndexDetail',
      data: {
        uid: app.data.uid,
        v_id: options.pid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if (options.id) {//从免费的进
          for (var a in res.data.data.list) {
            if (options.id == res.data.data.list[a].id){
              that.setData({
                voindex:a
              })
           }
          }
        }
        if (!res.data.data.list){
          wx.showToast({
            title: "未获取到课程列表",
            icon: 'loading',
            duration: 1500
          });
          setTimeout(function(){
            wx.navigateBack({ changed: true });//返回上
          },1500)
        }else{
          that.setData({
            voList: res.data.data.list,
            vo: res.data.data.list[that.data.voindex],
            total: res.data.data.total.money,
            totalShow: res.data.data.total.is_show
          });
        }
        
      }
    })

    that.videoContext = wx.createVideoContext('myVideo');
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
  onHide: function () {
    this.videoContext.pause();
  },
  play: function(e) {
    console.log(e.currentTarget.dataset.is_payed);
    if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
      console.log(111);
    }else{
      if (this.data.isPaly) {

      } else {
        this.videoContext.play();
        this.setData({
          isPaly: !this.data.isPaly,
        })
      }
    }
    
  },
  playVideo: function(e) {
    if (e.currentTarget.dataset.is_payed === 1) { //如果已经解锁
      if (this.data.isPaly) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
      this.setData({
        isPaly: !this.data.isPaly
      })
    } else if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
      this.setData({
        isPaly: !this.data.isPaly
      })
    }
  },
  bf2video: function(e) {
    if (e.currentTarget.dataset.is_payed === 1) { //如果已经解锁
      this.setData({
        voindex: e.currentTarget.dataset.index,
        vo: this.data.voList[e.currentTarget.dataset.index]
      })
      wx.setNavigationBarTitle({
        title: this.data.vo.title
      })
    } else if (e.currentTarget.dataset.is_payed === 2) { //未解锁
      wx.showToast({
        title: "该课程您还未解锁，不能访问",
        icon: 'loading',
        duration: 1500
      })
    }
  },

  pay2money:function(e){
    if (app.data.uid === '') {
      wx.showModal({
        title: '提示',
        content: '绑定手机号获取更多精彩内容',
        cancelText: "先逛逛",
        // cancelColor: 'skyblue',
        confirmText: "去绑定",
        confirmColor: '#D1141B ',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/index'
            })
          } else if (res.cancel) {
          }
        }
      })
    }else{
      var that = this;
      wx.request({
        method: 'POST',
        url: util.getDomain + '/wxxcx/index/addOrder',
        data: {
          type: 1,
          openId: app.data.oppenId,
          uid: app.data.uid,
          p_id: e.currentTarget.dataset.pid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var order_sn = res.data.data.order_sn;
          if (res.data.code === 1) {
            wx.requestPayment(
              {
                'timeStamp': '' + res.data.data.timeStamp,
                'nonceStr': res.data.data.nonceStr,
                'package': res.data.data.package,
                'signType': 'MD5',
                'paySign': res.data.data.paySign,
                'success': function (res) {//支付成功时触发
                  if (res.errMsg == "requestPayment:ok") {
                    wx.request({
                      method: 'POST',
                      url: util.getDomain + '/wxxcx/index/changeOrderStatus',
                      data: {
                        uid: app.data.uid,
                        order_sn: order_sn
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        if (res.data.code === 1) {
                          wx.showToast({
                            title: '解锁成功',
                            icon: 'success',
                            duration: 2000
                          })
                          setTimeout(function () {
                            var pid = that.data.total_pid;
                            that.data = {
                              getDomain: util.getDomain,
                              vo: {},
                              voindex: 0,
                              voList: [],
                              total: 0,
                              totalShow: 1,
                              total_pid: '',
                              isPaly: false
                            }
                            that.onLoad({ 'pid': pid });
                          }, 2000);
                        } else {
                          wx.showToast({
                            title: '解锁失败',
                            icon: 'loading',
                            duration: 2000
                          })

                        }
                      }
                    })
                  }

                },
                'fail': function (res) {//取消支付时触发
                  if (res.errMsg == "requestPayment:fail cancel") {
                    wx.showToast({
                      title: '取消付款',
                      icon: 'loading',
                      duration: 2000
                    })
                  }

                }
              })
          }
        }
      })
    }



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
    console.log("刷新");
    wx.startPullDownRefresh()
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