//index.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [{
      linkUrl: '',
      url: 'https://i.loli.net/2018/10/11/5bbead684f511.jpg'
    }, {
      linkUrl: '',
      url: 'https://i.loli.net/2018/10/11/5bbead6862d32.png'
    }, {
      linkUrl: '',
      url: 'https://i.loli.net/2018/10/11/5bbead684f511.jpg'
    }, {
      linkUrl: '',
      url: 'https://i.loli.net/2018/10/11/5bbead6862d32.png'
    }],
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
      src: 'http://1254161541.vod2.myqcloud.com/284b4cc5vodtransgzp1254161541/384989e55285890782258301412/v.f30.mp4',
      img: '../../images/video-img.png',
      btn: '../../images/play.png'

    },
    navFooter: [{
        imgUrl: '../../images/index.png',
        txt: '首页',
        active: 'active',
        linkUrl: '/pages/entry/index'
      },
      {
        imgUrl: '../../images/sy_my_black.png',
        txt: '我的',
        active: '',
        linkUrl: '/pages/technology/index'
      }
    ],
    telicon: app.data.telicon
  },

  //链接跳转的第二种方法
  // linkjump: function (event){
  //  var urls = event.currentTarget.dataset.url;
  //   wx.navigateTo({
  //     url: urls
  //     })
  // },

  /**
   * 生命周期函数--监听页面加载,获取用户基本信息
   */
  onLoad: function(options) {
    // wx.getUserInfo({
    //   success: function (res) {
    //     var userInfo = res.userInfo //用户基本信息
    //     var nickName = userInfo.nickName //用户名
    //     var avatarUrl = userInfo.avatarUrl //头像链接
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province //所在省
    //     var city = userInfo.city //所在市
    //     var country = userInfo.country //所在国家
    //   }
    // })
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

  },

  //调用服务热线
  PhoneCall: app.PhoneCall,

  //播放视频
  PlayVoid: function() {

  },
  //videoErrorCallback
  videoErrorCallback: function(e) {
    console.log('视频错误信息:' + e.detail.errMsg);

  }

})