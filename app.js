// app.js
const http = require("./http")

TodoList({
    onLaunch: function () {
        var that = this;
        this.http = http

        wx.login({
            success: res => {
                wx.request({
                    url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
                    success: res => {
                        that.globalData.openid = res.data.openid;
                    }
                })
            }
        });
    },

    /**
     * 设置全局变量
     */
    globalData: {
        openid: 0,
        wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc984af8c8c192760&secret=4d773995e58a08dd297550ba455e4595&js_code=',
        wx_url_2: '&grant_type=authorization_code'
    },

    globalData: {
        userInfo: null
    }
})