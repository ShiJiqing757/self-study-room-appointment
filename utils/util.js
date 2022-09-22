const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getNowDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month,day].map(formatNumber).join('-')
  }

  const getNowTime = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [hour, minute].map(formatNumber).join(':')
  }

module.exports = {
  formatTime,
  getNowDate:getNowDate,
  getNowTime:getNowTime
}
