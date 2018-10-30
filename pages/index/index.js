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
    video: {
    },
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
    wx.request({
      url: util.getDomain+'/wxxcx/index/Index', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('video');


  },
  onHide:function(){
    this.videoContext.pause();
  },
  //调用服务热线
  PhoneCall: app.PhoneCall,

  //播放视频
  PlayVoid: function(e) {
    if (this.data.isPaly ){
     
    }else{
      this.videoContext.play();
      this.setData({
        isPaly: !this.data.isPaly,
      })
    }
    

  },
  //videoErrorCallback
  videoErrorCallback: function(e) {
    console.log('视频错误信息:' + e.detail.errMsg);

  },
  play:function(){
    if(this.data.isPaly){
      this.videoContext.pause(); 
    }else{
      this.videoContext.play();
    }
    this.setData({
      isPaly: !this.data.isPaly
    })
  }

})