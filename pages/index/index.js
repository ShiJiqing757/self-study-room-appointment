// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name:'木屋自习室',
    address:'广东省深圳市南山区xxxxx',
    phone:'手机:1986767xxxx',
    tab:0
  },

  // 跳转到预定页面
  goTo:function(){
        wx.switchTab({
          url: '../reserve/reserve',
        })
      },

  click:function(e){
    this.setData({
      tab:e.target.dataset.num
    })
  },
  change:function(e){
    this.setData({tab:e.detail.current})
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
