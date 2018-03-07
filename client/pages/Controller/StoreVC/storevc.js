
let app = getApp()
var pushsub = require('../../../utils/Pushsub.js') 

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // listData:[
    //   { 
    //     imageurl: '../../../image/icon64_appwx_logo.png',
    //     title:'11111',
    //     count:'1',
    //     content:'1111113421321312312313123123'
    //   },
    //   { 
    //     imageurl: '../../../image/icon64_appwx_logo.png',
    //     title: '22222',
    //     count: '2',
    //     content: '22222'  
    //   },
    //   { 
    //     imageurl: '../../../image/icon64_appwx_logo.png',
    //     title: '3333',
    //     count: 4,
    //     content: '3333' 
    //   },
    //   { 
    //     imageurl: '../../../image/play.png',
    //     title: '4444',
    //     count: 5,
    //     content: '4444' 
    //   }
    // ],
    topImageData:[
    ],
    logo:'',
    name:'',
    address:'',
    storeTime:'',
    storePhone: '',
    storeContent:'',
    latitude:0,
    longitude:0,
    phone:''
  },
  switchBtnAction:function(){
    wx.navigateTo({
      url: 'changeStore',
    })
  },
  phoneCall:function(){
    var phone = this.data.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        // console.log(res)
        wx.showToast({
          title: '呼叫失败',
          icon: 'none'
        })
      }
    })
  },
  locationPush: function () {
    wx.openLocation({
      longitude: Number(this.data.longitude),
      latitude: Number(this.data.latitude),
      name: this.data.name,
      address: this.data.address
    });
    // wx.getLocation({
    //   type:'gcj02',
    //   success: function(res) {
        
    //   },
    //   fail:function(res){
    //     wx.showToast({
    //       title: '定位失败',
    //     })
    //   },
    //   complete:function(res){
    //     wx.hideLoading()
    //   }
    // })
    
  },

  showimagePreview:function(res){
    var topImageData = this.data.topImageData;
    // var currentid = res.target.id;
    var currentid = res.currentTarget.dataset.index
    var cptopImageData = new Array();
    for (var i = 0; i < topImageData.length;i++){
      cptopImageData.push(topImageData[i].url);
    }
    var currenturl = cptopImageData[currentid];
    wx.previewImage({
      current:currenturl,
      urls: cptopImageData,
    })
  },

  reGetData:function(res){
    console.log(res);
    var that = this;
    wx.request({
      url: 'https://app.tongjichaye.com/zznj/wxrest/queryStoreDetail?id=24',
      data: {
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      complete: function (res) {
        console.log(res);
        wx.stopPullDownRefresh();
        var imageData = res.data.data.store.imgs;
        var igAry = new Array();
        var logo = '';
        for (var i = 0; i < imageData.length; i++) {
          var imgData = {
            url:imageData[i]
          };
          if(i == 0){
            logo = imageData[i];
          };
          igAry.push(imgData);
        }

        that.setData({
          name: res.data.data.store.name,
          address: res.data.data.store.address,
          storeTime: '营业时间：' + res.data.data.store.businessFromTime + '-' + res.data.data.store.businessToTime,
          storePhone: '营业电话：' + res.data.data.store.mobile,
          storeContent: res.data.data.store.storeDesc,
          latitude: res.data.data.store.latitude,
          longitude: res.data.data.store.longitude,
          topImageData:igAry,
          logo:logo,
          phone: res.data.data.store.mobile
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reGetData('');
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
    }),
    this.reGetData('');
    // var cpListData = this.data.listData;
    // cpListData.push({
    //   imageurl: '../../../image/icon64_appwx_logo.png',
    //   title: '22222',
    //   count: '2',
    //   content: '22222' 
    // });
    // this.setData({
    //   listData:cpListData
    // })
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
    console.log(1111);
  }
})