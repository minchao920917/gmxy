// pages/course/index.js
//获取应用实例
var util = require('../../utils/util.js');
var MD5Util = require('../../utils/md5.js'); 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:false,
    loadingTip:"加载中",
    scrollTop:0,
    getDomain: util.getDomain,
    vpage:1,
    rpage:1,
    vfreeList:[],
    vList:[],
    rfreeList: [],
    rList: [],
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
    if (this.data.currentTab == 1){
      this.getR(this.data.rpage,app.data.uid)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getV(this.data.vpage);
    this.getR(this.data.rpage,app.data.uid);
  },
  checkPhone: function (openId) {
    wx.request({
      method: 'POST',
      url: util.getDomain1 + '/wxxcx/xcxapi/isappcustomer',
      data: {
        wechat: openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 0) {
          wx.showModal({
            title: '提示',
            content: '您需绑定手机号成为股管家app用户，绑定后获取更多精彩内容！',
            cancelText: "先逛逛",
            confirmText: "去绑定",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/bindPhone/index'
                })
              } else if (res.cancel) {
              }
            }
          })
        } else if (res.data.code === 1) {
          app.data.phone = res.data.data.cellphone;
          app.data.uid = res.data.data.uid;
        }

      }
    })
  },
  /*
  * 内容移动到底部
  */
  tapMove: function () {
    this.setData({
      scrollTop: (this.data.vList.length-4)*80
    })
  },
  upper:function(e){

  },
  getScroll:function(e){
    this.setData({
      vpage: this.data.vpage + 1,
      loadingTip:"加载中..."
    });
    this.getV(this.data.vpage);

  },
  getRScroll: function (e) {
    this.setData({
      rpage: this.data.rpage + 1,
      loadingTip:"加载中..."
    });
    this.getR(this.data.rpage,app.data.uid);

  },
  getV:function(page){
    var that = this;
    that.setData({
      hiddenLoading: false
    })
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/vedioIndex',
      data: {
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.data.list.length == 0){
          that.setData({
            loadingTip:"已加载到底部",
            hiddenLoading: false,
            vpage: that.data.vpage - 1
          });
          setInterval(function() {
                that.setData({
                  hiddenLoading: true
                });
              }, 1000);
        }else{
          that.setData({
            hiddenLoading: true,
            vfreeList: res.data.data.free_list,
            vList: that.data.vList.concat(res.data.data.list)
          });
          
        }
        
        // that.tapMove();
      }
    })
  },
  getR: function (page,uid) {
    if (!uid) {//存在openId
      if (app.data.phone == "") {//没获取到手机号和uid
        this.checkPhone(app.data.oppenId);
      }
    }
    var that = this;
    that.setData({
      hiddenLoading: false
    })
    wx.request({
      method: 'POST',
      url: util.getDomain + '/wxxcx/index/reportIndex',
      data: {
        page: page,
        uid:uid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.data.list.length == 0) {
          that.setData({
            loadingTip: "已加载到底部",
            hiddenLoading: false,
            rpage: that.data.rpage - 1
          });
          setInterval(function () {
            that.setData({
              hiddenLoading: true
            });
          }, 1000);
        } else {
          that.setData({
            hiddenLoading: true,
            rfreeList: res.data.data.free_list,
            rList: that.data.rList.concat(res.data.data.list)
          });

        }

        // that.tapMove();
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
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function(index) {
    
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
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  jump2report:function(e){
    if (e.currentTarget.dataset.is_payed === 1){//已经解锁直接跳转新闻
      wx.navigateTo({
        url: '/pages/reportDetail/index?id=' + e.currentTarget.dataset.id
      })
    } else if (e.currentTarget.dataset.is_payed === 2){//未解锁，弹出提示
          wx.showToast({
            title: "该研报您还未解锁，不能访问",
            icon: 'none',
            duration: 1500
          })
    }
  },
  pay2money: function (e) {
    var index = e.currentTarget.dataset.index;
    if (app.data.uid === ''){
      wx.showModal({
        title: '提示',
        content: '您需绑定手机号成为股管家app用户，绑定后获取更多精彩内容！',
        cancelText: "先逛逛",
        confirmText: "去绑定",
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
          type: 2,
          openId: app.data.oppenId,
          uid: app.data.uid,
          p_id: e.currentTarget.dataset.id
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
                          that.data = {
                            hiddenLoading: false,
                            loadingTip: "加载中",
                            scrollTop: 0,
                            getDomain: util.getDomain,
                            vpage: 1,
                            rpage: 1,
                            vfreeList: [],
                            vList: [],
                            rfreeList: [],
                            rList: [],
                            currentTab: 0
                          }
                          that.onLoad();
                        } else {
                          wx.showToast({
                            title: '解锁失败',
                            icon: 'none',
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
})