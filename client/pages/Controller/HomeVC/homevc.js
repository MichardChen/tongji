Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertisement:'',
    android:'',
    ios:'',
    appid:'wxa8893a771e4a18ca', //填写微信小程序appid  
    secret:'143463f0737a62f4cd3c5adc0efc7a0f' //填写微信小程序secret
  },

  loginAgain:function(){
    var that = this;
    wx.login({
      success: function (loginCode) {  
        console.log(loginCode.code);
        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://app.tongjichaye.com/zznj/wxrest/sendClientMsg?appId=' + that.data.appid + '&code=' + loginCode.code +'',
          data: {
          },
          header: {
            'content-type': "application/json;charset=UTF-8"
          },
          success: function (res) {
            var openid = res.data.data["openId"]
            if (openid != undefined){
              wx.setStorage({
                key: 'oppenid',
                data: res.data.data["openId"],
              })
            }
            console.log(res) //获取openid  
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    }) 
  },


  andriodTap:function(){
    var that = this;
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'oppenid',
          success: function(storage) {
            if (storage.data != undefined){
              wx.request({
                url: 'https://app.tongjichaye.com/zznj/wxrest/sendClientMsgCodeInvalid?appId=' + that.data.appid + '&openId=' + storage.data + '',
                method: 'POST',
                header: {
                  "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (res) {
                  console.log(res) //
                },
                fail: function (res) {
                  wx.showToast({
                    title: res,
                  })
                }
              })
            }else{
              that.loginAgain()
            }
          },
        })
      },
      fail: function () {
        that.loginAgain()
      }
    });
  },
  iosTap:function(){
    var that = this;

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://app.tongjichaye.com/zznj/wxrest/index',
      data: {
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      complete: function (res) {
        console.log(res);
        that.setData({
          advertisement: res.data.data.advertisement,
          android: res.data.data.android,
          ios: res.data.data.ios
        })
      },
      success: function (res) {
        // console.log(res)
      },
      fail: function (res) {
        // console.log(res)
      }
    })
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