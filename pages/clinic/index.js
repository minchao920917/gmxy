// index.js
//获取应用实例
var app = getApp();

//正则验证
var gpreg = /^[0-9]{6}$/;
var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
var peonum = 6245;
Page({

  //页面数据
  data: {
    telicon: app.data.telicon,
    peonum: peonum,
    banerImg: '../../images/clinic_baner.jpg',
    sixInfo: [{
      name: '综合评测',
      info: '强弱排名 操盘建议',
      icon: '../../images/clinic1.jpg'
    },
    {
      name: '股性详解',
      info: '趋势周期 波动率 偏离值',
      icon: '../../images/clinic2.jpg'
    },
    {
      name: '涨跌停基因',
      info: '涨跌停收 益回测、 涨跌质量',
      icon: '../../images/clinic3.jpg'
    },
    {
      name: '主力追踪',
      info: '资金流向 大单追踪',
      icon: '../../images/clinic4.jpg'
    },
    {
      name: '股东变化',
      info: '股东人数 人均持股 机构持仓',
      icon: '../../images/clinic5.jpg'
    },
    {
      name: '价值透视',
      info: '机构评级 研报精华',
      icon: '../../images/clinic6.jpg'
    }
    ],
    cleanval:''
  },

  //诊股人数变化
  onLoad: function () {
    var that = this;
    setInterval(function(){
      peonum += Math.floor(Math.random()*10);
      that.setData({
        peonum: peonum
      })
    },1000)
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (event) {
  },

  //表单验证
  formSubmit: function (e){
    var codeval = e.detail.value.stockcode;
    var telval = e.detail.value.tel;
    var flag = true;
    var that = this;
    
    //提示函数 
    var tips = function (txt) {
          wx.showModal({
            title: '提示',
            content: txt
          })
          flag = false;
          return flag;
       };
        // 股票代码不对
        if (!gpreg.test(codeval)){
              tips('股票代码填写不对，请重新填写');
        };
        // 电话号码不对
        if (!telReg.test(telval)) {
           tips('手机号码填写不对，请重新填写');
        };

        //数据提交
        if (flag){
          wx.request({
            url: app.data.weburl + 'api/stock/addPhone', //接口地址
            data: {//接口接受的字段
              phone: telval,
              appId: 2,
              name: '',
              code: codeval
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: function (res) {
              that.setData({
                cleanval: ''
              });
              tips('提交成功，稍后我们会有客服人员与您联系！');
            },
            fail: function (res){
              tips('提交失败！');
            }
          })
        }
    
  },



  //调用服务热线
  PhoneCall: app.PhoneCall

})