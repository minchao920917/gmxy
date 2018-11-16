// us.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banerImg:'../../images/us_baners.jpg',
    txt: "111221132",
    telicon: app.data.telicon
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //调用服务热线
  PhoneCall: app.PhoneCall
})