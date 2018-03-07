// pages/Controller/StoreVC/changeStore.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      // {
      //   imageurl: '../../../imagecache/1@2x.png',
      //   title: '同记1号店',
      //   content: '厦门市思明区软件园2期36号401',
      //   distance:'2km'
      // },
      // {
      //   imageurl: '../../../imagecache/1@2x.png',
      //   title: '同记2号店',
      //   content: '厦门市思明区软件园2期36号402',
      //   distance: '1km'
      // }
    ],
    pageNum: 1,
    pageSize:10,
    latitude:0,
    longitude:0,
    defaultHidden:false
  },


  pushBackAndResetStoreID:function(res){
    // wx.navigateBack({
    //   delta:1,
    //   // success:function(res){
    //   //   var page = getCurrentPages();
    //   //   for(var i=0;i<page.length;i++){
    //   //     console.log(page[i].__route__);
    //   //     if (page[i].__route__ == 'pages/Controller/StoreVC/storevc') {
    //   //       page[i].reGetData('id');
    //   //     };
    //   //   }
    //   // }
    // });
    
    // app.pages.get('pages/StoreVC/storevc').sayHello('hello u3xyz.com');

    var listData = this.data.listData;
    var currentid = res.currentTarget.dataset.index;
    var appid = listData[currentid].appId;

    wx.navigateToMiniProgram({
      appId: appid,
      // path: 'pages/index/index?id=wxea1ffccd33a4f80e',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      },
      fail(res){
        console.log(res);
      }
    });
  },




  loadNetData:function(){
    var that = this;
    wx.request({
      url: 'https://app.tongjichaye.com/zznj/wxrest/queryTeaStoreList?pageSize=' + that.data.pageSize + '&pageNum=' + that.data.pageNum + '&localLongtitude=' + that.data.longitude + '&localLatitude=' + that.data.latitude +'',
      data: {
        // pageSize:that.data.pageSize,
        // pageNum:that.data.pageNum
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      complete: function (res) {
        console.log(res);
        wx.stopPullDownRefresh()
      },
      success: function (res) {
        // console.log(res)
        var listAry = new Array(); 
        if(that.data.pageNum > 1){
          listAry = that.data.listData;
        }
        var cpList = res.data.data.storeList;
        for(var i = 0;i < cpList.length; i++){
          listAry.push(cpList[i]);
        }
        var cppageNum = that.data.pageNum;
        if(cpList.length > 0){
          cppageNum = cppageNum + 1;
        }
        var hidden = true
        if(listAry.length == 0){
          hidden = false
        }
        that.setData({
          listData:listAry,
          pageNum: cppageNum,
          defaultHidden: hidden
        })
      },
      fail: function (res) {
        // console.log(res)
        wx.showToast({
          title:res.errMsg
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.loadNetData();
      },
      fail:function(res){
        wx.showToast({
          title: '定位失败',
        })
      },
      complete:function(res){
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
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    this.setData({
      pageNum: 1
    })
    this.loadNetData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    this.loadNetData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})