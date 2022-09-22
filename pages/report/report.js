// pages/report/report.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tipsshow: {},
        frequency:'0',
        thisTime:'0',
        cumulative:'0'
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
          success: (res) => {
            console.log(res);
            this.setData({
              userInfo: res.userInfo,
              config: {
                tipsshow: "hide"
              }
            })
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