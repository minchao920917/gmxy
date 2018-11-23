// pages/downApp/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  saveImg:function(e){


    var href = e.currentTarget.dataset.href;
    if (!wx.saveImageToPhotosAlbum) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      return;
    }
    else{
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            // 接口调用询问  
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                util.downloadImage(downloadUrl);
              },
              fail() {
                // 打开设置页面  
                wx.openSetting({
                  success: function (data) {

                  },
                  fail: function (data) {

                  }
                });
              }
            })
          } else {

            wx.showModal({
              title: '提示',
              content: '您是否同意微信保存图片到您本地相册',
              success(res) {
                if (res.confirm) {
                  wx.downloadFile({
                    url: href,
                    success: function (res) {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (res) {
                          wx.showToast({
                            title: '成功保存到相册',
                            icon: 'success',
                            duration: 2000
                          })
                        },
                        fail: function (res) {
                          wx.showToast({
                            title: '保存失败，您可以尝试先截屏再识别二维码',
                            icon: 'none',
                            duration: 2000
                          })
                        }
                      })
                    },
                    fail: function () {
                      wx.showToast({
                        title: '保存失败，您可以尝试先截屏再识别二维码',
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  })
                } else if (res.cancel) {

                }
              }
            })
          }
        },
        fail(res) {

        }

      })
    }







    
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