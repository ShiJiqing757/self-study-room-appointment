// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({});
  const cont = db.collection('reserve');
  const _ = db.command
  const res = await cont.where({
    endDate: _.gte(event.startDate).and(_.lte(event.endDate))
  }).get()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    res
  }
}