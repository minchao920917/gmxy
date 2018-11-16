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
    console.log(openId);
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
            content: '绑定手机号获取更多精彩内容',
            cancelText: "先逛逛",
            cancelColor: 'skyblue',
            confirmText: "去绑定",
            confirmColor: '#D1141B ',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/bindPhone/index'
                })
              } else if (res.cancel) {
                //console.log('点击取消')
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
    // console.log("向上滑动");
    // console.log(e.detail);
  },
  getScroll:function(e){
    // console.log("向下滑动");
    this.setData({
      vpage: this.data.vpage + 1,
      loadingTip:"加载中..."
    });
    this.getV(this.data.vpage);

  },
  getRScroll: function (e) {
    // console.log("向下滑动");
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
    console.log("视频第" + page + "页");
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
        console.log(res.data.data.free_list);
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
    console.log("研报第"+page+"页");
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
        console.log(res.data);
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
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  jump2report:function(e){
    console.log(e);
    if (e.currentTarget.dataset.is_payed === 1){//已经解锁直接跳转新闻
      wx.navigateTo({
        url: '/pages/reportDetail/index?id=' + e.currentTarget.dataset.id
      })
    } else if (e.currentTarget.dataset.is_payed === 2){//未解锁，弹出提示
          wx.showToast({
            title: "该研报您还未解锁，不能访问",
            icon: 'loading',
            duration: 1500
          })
    }
  },
  pay2money: function (e) {
    console.log(e);
    var timeStamp = String(Date.parse(new Date())/1000);
    console.log(timeStamp);
    var payDataA = "appId=" + app.data.appId + "&nonceStr=" + 'sss' + "&package=prepay_id=" + 'preid' + "&signType=MD5&timeStamp=" + timeStamp;
    var payDataB = payDataA + "&key=" + app.data.secret; 
    wx.requestPayment(
      {
        'timeStamp': timeStamp,
        'nonceStr': 'sss',
        'package': 'preid',
        'signType': 'MD5',
        'paySign': MD5Util.MD5(payDataB).toUpperCase(),
        'success': function (res) { 
          console.log("成功!");
        },
        'fail': function (res) {
          console.log("失败");
          console.log(res);
         },
        'complete': function (res) {
          console.log("完成");
         }
      })
  }
})