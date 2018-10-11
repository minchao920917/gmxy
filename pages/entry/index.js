// index.js
//获取应用实例
var app = getApp();
var pagenum = 0;   //请求数据页数,数据按页加载
var isTrue = true; //判断的钩子，作为当前数据加载完毕，在进行下次加载的钩子
var datatype = 1;
var status;

//数据加载方法
//1.在页面滚动到底部触发加载数据函数的时候，判断的钩子，作为当前数据加载完毕，在进行下次加载的钩子
//2.数据咋加载是按页面，一页一页数据加载进来的
var loadmore = function (that, types) {
  //请求的页码数
  pagenum++;

  //开启提示
  wx.showLoading({
    title: '加载中',
  }),

    wx.request({
      url: app.data.weburl + 'api/article/lists',
      data: {
        cateId: types,
        p: pagenum //传递页码数，获取该页数据
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var nums = res.data.pages; //总的页码数
        // console.log(res.data)
        status = res.data.status;

        if (pagenum <= nums) { //请求页数，小于总页数时候执行，表示有数据可加载
          // 请求当前页的数据==>新数据==》数组
          var curdata = res.data.data;

          //往数组填数据
          for (var k = 0; k < curdata.length; k++) {
            that.data.listdata.push(curdata[k])
          };

          //设置数据
          that.setData({
            listdata: that.data.listdata //新数组合并到老数组中
          });

          //数据加载完毕，开放接口，下次加载
          isTrue = true;


        };


        if (res.data.total === 0) {
          that.setData({
            havenone: true
          });
        }

      }
    }),

    //关闭提示
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
}


Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    listdata: [],
    havenone: false
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    pagenum = 0;
    loadmore(this, datatype);
  },



  //滚动底部触发事件
  lower: function () {
    var that = this;
    if (isTrue) { //请求数据加载完毕后，再次执行
      isTrue = false; //进来后，关闭大门，等数据加载完毕后在执行下次加载
      loadmore(that, datatype);
    } else if (isTrue === false && status === 0) { //isTrue为false（isTrue在数据加载完毕后才会为true）,并且status==0没有数据响应
      wx.showLoading({
        title: '数据已加载完',
      });

      setTimeout(function () {
        wx.hideLoading()
      }, 1000);
    }
  },







	/**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () { }

})