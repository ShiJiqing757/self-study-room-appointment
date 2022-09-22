// 封装云开发方法
if (!wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库以使用云能力');
} else {
  wx.cloud.init({
    // env 参数说明：
    //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //   如不填则使用默认环境（第一个创建的环境）
    env: '',
    traceUser: true,
  });
}

const db = wx.cloud.database()

const getTime = () => {
  var myDate = new Date((new Date).getTime() + 8 * 60 * 60 * 1000);
  var time = myDate.toJSON().split('T').join(' ').substr(0, 19);
  return time
}

const getRandom = (t = 99999999) => {
  return Math.floor(Math.random() * t)
}

// // 管理员微信签名 "3cfdc254e117c4db7fa0c9044dc51637965839c7"
// const admin = ["3cfdc254e117c4db7fa0c9044dc51637965839c7"]

const user = {
  // get
  async get(id) {
    let data = {}
    if (id) {
      data = await db.collection('user').doc(id).get()
    } else {
      data = await db.collection('user').get()
    }

    return data
  },
  // 用户
  async login(user) {
    // 获取openid
    const result = await wx.cloud.callFunction({
      name: "cloudAppid",
    })

    const data = await db.collection('user').where({
      // token: user.signature,
      openid: result.result.openid,
    }).get()
    if (data.data.length > 0) {
      return {
        data: {
          ...data.data[0],
          openid: result.result.openid,
        }
      };
    } else {
      // console.log(result.result);

      return db.collection('user').add({
        data: {
          name: user.name,
          sex: user.gender,
          openid: result.result.openid,
          img: user.img,
        }
      })
    }
  },
  async up(id, u) {
    return db.collection('user').doc(id).update({
      data: {
        ...u
      }
    })
  },
  async del(id) {
    const c = await db.collection('user').doc(id).remove()
    return c
  }
}

const sign = {
  // get
  async get(uid) {
    let data = {}
    if (uid) {
      data = await db.collection('sign').where({
        // token: user.signature,
        uid: uid,
      }).get()
    } else {
      data = await db.collection('sign').get()
    }

    return data
  },
  async add(sign) {
    return db.collection('sign').add({
      data: {
        uid: sign.uid,
        time: sign.time, // 秒
        status: sign.status, // 状态
      }
    })
  },
  async up(id, u) {
    return db.collection('sign').doc(id).update({
      data: {
        ...u
      }
    })
  },
  async del(id) {
    const c = await db.collection('sign').doc(id).remove()
    return c
  }
}

const reserve = {
  // 获取当前时间段的座位
  async isHave(r) {
    const _ = db.command
    const data = await db.collection('reserve').where(_.and([{
        startDate: _.lte(r.endDate)
      },
      {
        endDate: _.gte(r.startDate)
      }
    ])).get()
    console.log(data);
    console.log(r);
    return data
  },
  // get
  async get(uid) {
    let data = {}
    if (uid) {
      data = await db.collection('reserve').where({
        uid: uid,
      }).get()
    } else {
      data = await db.collection('reserve').get()
    }

    return data
  },
  async add(reserve) {
    return db.collection('reserve').add({
      data: {
        uid: reserve.uid,
        startDate: reserve.startDate,
        endDate: reserve.endDate,
        seat: reserve.seat, // "1,2,3"可多选座位
      }
    })
  },
  async up(id, u) {
    return db.collection('reserve').doc(id).update({
      data: {
        ...u
      }
    })
  },
  async del(id) {
    const c = await db.collection('reserve').doc(id).remove()
    return c
  }
}


module.exports = {
  user,
  sign,
  reserve,
  getRandom,
}