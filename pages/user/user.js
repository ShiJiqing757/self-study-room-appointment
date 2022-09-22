// pages/user/user.js
const app = getApp()
const utils = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipsshow: {},
    frequency: '0',
    thisTime: '0',
    cumulative: '0',
    state: "paused", // paused stop
    time: "",
    id: "", // 签到id，开始签到生成
    tVal: 0, // 记录秒
    timeEl: null,
  },

  async get() {
    if (!app.globalData.openid)
      return
    const res = await app.http.sign.get(app.globalData.openid)
    let t = res.data.map(item => item.time).reduce((a, b) => a + b, 0)
    this.setData({
      frequency: res.data.length,
      thisTime: (t / 60).toFixed(2),
    })
    console.log(res);
  },

  async qiandao() {
    if (!app.globalData.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000
      })
      return
    }

    const res = await app.http.sign.add({
      uid: app.globalData.openid,
      time: 0, // 秒
      status: "paused", // 状态
    })
    if (res._id) {
      wx.showToast({
        title: '开始签到',
      });
      this.setData({
        id: res._id
      })
    } else {
      wx.showToast({
        title: '已存在',
      });
    }
    console.log(res);

    this.handleStart()


  },

  async handleStart() {
    var n_sec = 0; //秒
    var n_min = 0; //分
    var n_hour = 0; //时
    //60秒 === 1分
    //60分 === 1小时


    let t = setInterval(() => {
      var str_sec = n_sec;
      var str_min = n_min;
      var str_hour = n_hour;
      if (n_sec < 10) {
        str_sec = "0" + n_sec;
      }
      if (n_min < 10) {
        str_min = "0" + n_min;
      }

      if (n_hour < 10) {
        str_hour = "0" + n_hour;
      }

      var time = str_hour + ":" + str_min + ":" + str_sec;
      // ele_timer.value = time;
      console.log(time, n_sec,
        n_min,
        n_hour);

      this.setData({
        time: time,
        state: "stop",
        tVal: this.data.tVal + 1
      })
      n_sec++;
      if (n_sec > 59) {
        n_sec = 0;
        n_min++;
      }
      if (n_min > 59) {
        n_sec = 0;
        n_hour++;
      }

    }, 1000);

    this.setData({
      timeEl: t
    })
  },

  async tuiqian() {
    if (!app.globalData.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000
      })
      return
    }

    if (!this.data.id) {
      wx.showToast({
        title: 'ID不存在',
        icon: 'error',
        duration: 2000
      })
      return
    }

    const res = await app.http.sign.up(this.data.id, {
      uid: app.globalData.openid,
      time: this.data.tVal, // 秒
      status: "stop", // 状态
    })
    if (res.stats.updated > 0) {
      wx.showToast({
        title: '退签成功',
      });
      this.setData({
        state: "paused"
      })
    } else {
      wx.showToast({
        title: '已存在',
      });
    }
    this.handleStop()
    this.get()
    console.log(res);
  },

  handleStop() {
    console.log(this.data.timeEl);
    clearInterval(this.data.timeEl)

    // 
    this.setData({
      cumulative: (this.data.tVal / 60).toFixed(2),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserProfile({
      desc: '用于完善会员信息',
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
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