// newdetail.js
var app = getApp();
var huncun;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //newdtail: '',
    title: '',
    author: '',
    desc: '',
    content: '',
    create_time: '',
    view: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //请求页面详细数据
    var that = this;
    wx.request({
      url: app.data.weburl + 'api/article/info',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var str = res.data.data.content;
          that.setData({
            title: res.data.data.title,
            desc: res.data.data.desc,
            content: str.replace(/<img/g, "<img width='100%' height='auto' "),
            create_time: res.data.data.create_time,
            author: res.data.data.author,
            view: res.data.data.view
          });
          
        //获取页面来源的ID
        var pageid = res.data.data.id;

        //取出缓存页面的ID
        wx.getStorage({
          key: 'newid',
          success: function (res) {
            pageid += ','+ res.data;
          }
        });

        setTimeout(function(){
          wx.setStorage({
            key: "newid",
            data: pageid
          })
        },100)



        


        

       



      }
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})