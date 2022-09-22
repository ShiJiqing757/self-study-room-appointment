# self-study-room-appointment
自习室预约管理小程序

技术栈:微信原生小程序、node.js、云开发

介绍：<br>
&nbsp;数据库采用云开发中的云数据库，前台页面采用原生小程序语言，以微信开发者工具为开发工具 <br>
&nbsp;自习室管理系统主要由线上预约、及时更新座位情况、记录签到次数及累计学习时长三大模块组成
## 效果图<br><br>
&nbsp;&nbsp;![首页](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E9%A6%96%E9%A1%B5.png?raw=true)
<br><br>
&nbsp;&nbsp;![预定(1)](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E9%A2%84%E5%AE%9A(1).png?raw=true)
<br><br>
&nbsp;&nbsp;![预定(2)](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E9%A2%84%E5%AE%9A(2).png?raw=true)
<br>
&nbsp;&nbsp;进入预定页面，通过选择预定日期和预定时段，选择座位号进行预定，选中座位时，该座位背景颜色显示黄色，预定成功后，被预定座位背景颜色呈现灰色，“当前预定”文字将会变成“已预定”，避免用户重复预定，预定信息返回后台存储在云数据库里，由管理员通过云数据库进行查看与管理。
<br><br>
&nbsp;&nbsp;![用户](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E7%94%A8%E6%88%B7.png?raw=true)
<br><br>
&nbsp;&nbsp;预定座位需要先登录小程序，在用户页面中，用户点击“获取头像昵称”按钮，默认用微信账号进行登录小程序，用户账户信息将存储在云数据库中，当点击“签到”按钮后，“签到”文字会改变成“签退”，同时进行计时，当再次点击“签退”按钮时，文字将重新变成“签到”按钮，同时结束计时，并将签到次数，时长信息储存在该用户账号下，并累加签到次数与时长信息，累加后的时长返回前台用户页面展示给用户了解。
<br><br>
&nbsp;&nbsp;![预定(1)](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E6%BC%94%E7%A4%BA%E6%95%88%E6%9E%9C(1).png?raw=true)
<br><br>
&nbsp;&nbsp;![预定(2)](https://github.com/ShiJiqing757/self-study-room-appointment/blob/main/%E6%95%88%E6%9E%9C%E5%9B%BE/%E6%BC%94%E7%A4%BA%E6%95%88%E6%9E%9C(2).png?raw=true)