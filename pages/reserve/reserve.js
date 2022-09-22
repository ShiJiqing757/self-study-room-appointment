// pages/reserve/reserve.js
const util = require('../../utils/util');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: util.getNowDate(new Date()),
    endDate: util.getNowDate(new Date()),
    startTime: util.getNowTime(new Date()),
    endTime: util.getNowTime(new Date()),
    seatList: [], // 座位列表
    seat: "", // 座位
  },

  onInit() {
    let arr = Array.from({
      length: 35
    }, (item, index) => index + 1)

    this.setData({
      seatList: arr.map(item => ({
        val: item,
        disable: false,
        type: false
      }))
    })
  },

  async get() {
    let start = Math.round(new Date(this.data.startDate + ' ' + this.data.startTime).getTime());
    let end = Math.round(new Date(this.data.endDate + ' ' + this.data.endTime).getTime());

    const res = await app.http.reserve.isHave({
      startDate: start,
      endDate: end,
    })
    this.data.seatList.forEach((item, i) => {
      item.type = false
    })
    console.log(res);
    res.data.forEach(item => {
      let s = item.seat.split(",")
      s.forEach(ss => {
        // let index = this.data.seatList.findIndex(seatIndex => {
        //   console.log(seatIndex, ss);
        //   return ss.indexOf(seatIndex.val) !== -1
        // })
        this.data.seatList.forEach((item, i) => {
          if (item.val == ss) {
            item.type = true
          }
        })
      })
    })

    // console.log(this.data.seatList);
    this.setData({
      seatList: this.data.seatList
    })
  },

  handleSelectSeat(list) {
    return list.filter(item => item.disable).map(item => item.val).join(",")
  },

  bindSelect(e) {
    let val = e.currentTarget.dataset.val
    let type = e.currentTarget.dataset.type
    if ([true, 'true'].includes(type)) {
      wx.showToast({
        title: '已预定',
        icon: 'error',
        duration: 1000
      })
      return
    }

    let newList = [...this.data.seatList].map(item => (item.val === val ? {
      ...item,
      disable: !item.disable
    } : {
      ...item,
    }))


    this.setData({
      seatList: newList,
      seat: this.handleSelectSeat(newList)
    })

    console.log(val, this.data.seat);


  },

  //   bindDateChange: function(e) {
  //     this.setData({
  //         date: e.detail.value
  //     })
  //   },

  startDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
    this.get()
  },
  endDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
    this.get()
  },

  startTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
    this.get()
  },
  endTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
    this.get()
  },

  // 跳转到预定页面
  async goTo() {
    // wx.navigateTo({
    //   url: '../Booking information/Booking information',
    // })
    if (!app.globalData.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000
      })
      this.getUserProfile()
      return
    }

    console.log(new Date(this.data.startDate + ' ' + this.data.startTime), Math.round(new Date(this.data.startDate + ' ' + this.data.startTime).getTime()));

    let start = Math.round(new Date(this.data.startDate + ' ' + this.data.startTime).getTime());
    let end = Math.round(new Date(this.data.endDate + ' ' + this.data.endTime).getTime());
    const res = await app.http.reserve.add({
      uid: app.globalData.openid,
      startDate: start,
      endDate: end,
      seat: this.data.seat, // "1,2,3"可多选座位
    })

    if (res._id) {
      wx.showToast({
        title: '预定成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '预定失败',
        icon: 'error',
        duration: 2000
      })
    }



  },

  getUserProfile: function () {
    wx.getUserProfile({
      desc: '用于完善会员信息',
      success: async (res) => {
        console.log(res);
        const res1 = await app.http.user.login({
          name: res.userInfo.nickName,
          sex: res.userInfo.gender,
          img: res.userInfo.avatarUrl,
        })
        console.log(res1);
        if (res1._id) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })

          this.setData({
            userInfo: res.userInfo,
          })
        } else {
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })

          this.setData({
            userInfo: {
              avatarUrl: res1.data.img,
              nickName: res1.data.name
            }
          })
        }
        this.setData({
          config: {
            tipsshow: "hide"
          }
        })

        app.globalData.openid = res1.openid ? res1.openid : res1.data.openid

        this.get()
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
    this.onInit()
    this.get()
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