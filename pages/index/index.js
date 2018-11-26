//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDomain: util.getDomain,
    personInfo:{},
    banner: [],
    navInfo: [{
        imgUrl: '../../images/shishi.png',
        txt: '实时播报',
        linkUrl: '/pages/broadcast/index'
      },
      {
        imgUrl: '../../images/news.png',
        txt: '热门资讯',
        linkUrl: '/pages/hot/index'
      },
      {
        imgUrl: '../../images/course.png',
        txt: '精品课程',
        linkUrl: '/pages/course/index'
      },
      {
        imgUrl: '../../images/product.png',
        txt: '产品介绍',
        linkUrl: '/pages/products/index'
      }
    ],
    video: {},
    btn: '../../images/play.png',
    navFooter: [{
        imgUrl: '../../images/index.png',
        txt: '首页',
        active: 'active',
        linkUrl: '/pages/index/index'
      },
      {
        imgUrl: '../../images/sy_my_black.png',
        txt: '我的',
        active: '',
        linkUrl: '/pages/mine/index'
      }
    ],
    telicon: app.data.telicon,
    isPaly: false
  },

  /**
   * 生命周期函数--监听页面加载,获取用户基本信息
   */
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        var appId = app.data.appId;
        var secret = app.data.secret;
        wx.request({
          method: 'POST',
          url: util.getDomain1 + '/wxxcx/xcxapi/getUserInfo',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            app.data.oppenId = res.data.data.openid //返回openid
            that.checkPhone(app.data.oppenId);
          }
        });

      }
    }) 

    wx.request({
      url: util.getDomain + '/wxxcx/index/Index', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          banner: res.data.data.banner,
          video: res.data.data.vedio
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  checkPhone:function(openId){
    wx.request({
      method: 'POST',
      url: util.getDomain1 + '/wxxcx/xcxapi/isappcustomer', 
      data: {
        wechat:openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 0) {
          wx.showModal({
            title: '友情提示',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('video');
   


  },
  onHide: function() {
    this.videoContext.pause();
  },
  //调用服务热线
  PhoneCall: app.PhoneCall,

  //播放视频
  PlayVoid: function(e) {
    if (this.data.isPaly) {

    } else {
      this.videoContext.play();
      this.setData({
        isPaly: !this.data.isPaly,
      })
    }


  },
  //videoErrorCallback
  videoErrorCallback: function(e) {

  },
  jump2page: function (e) {
    if ("/"+this.route === e.currentTarget.dataset.url){
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  }
  // ,
  // play: function() {
  //   if (this.data.isPaly) {
  //     this.videoContext.pause();
  //   } else {
  //     this.videoContext.play();
  //   }
  //   this.setData({
  //     isPaly: !this.data.isPaly
  //   })
  // }

})