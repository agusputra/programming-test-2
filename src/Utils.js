export default {
  // date is string like this: `Mon Jan 01 2001 01:01:01 GMT+0101`
  parseDateAndTz(date) {
    const pattern = /([a-z]{3}) ([a-z]{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT(\+|\-)(\d{2})(\d{2})/i
    const matches = pattern.exec(date)
    let [, , month, day, year, hour, minute, second, serverTzSign, serverTzHour, serverTzMinute] = matches

    date = new Date(year, this.parseMonth(month) - 1, day, hour, minute, second)

    // Solve tz difference.
    // It means when local tz is UTC and server tz is UTC+0130, then date must be substracted 1 hour 30 minutes.
    // And when local tz is UTC and server tz is UTC-0130 then date must be added 1 hour 30 minutes.

    const localTzOffset = date.getTimezoneOffset() * 60000
    const serverTzOffset = -1 * parseInt(`${serverTzSign}1`) * ((serverTzHour * 60 * 60000) + (serverTzMinute * 60000))
    const utcTime = date.getTime() + localTzOffset
    date.setTime(utcTime + serverTzOffset)

    return date
  },

  parseMonth(month) {
    switch (month) {
      case 'Jan': return 1;
      case 'Feb': return 2;
      case 'Mar': return 3;
      case 'Apr': return 4;
      case 'Mei': return 5;
      case 'Jun': return 6;
      case 'Jul': return 7;
      case 'Aug': return 8;
      case 'Sep': return 9;
      case 'Oct': return 10;
      case 'Nov': return 11;
      case 'Dec': return 12
      default: throw 'error'
    }
  },

  formatDate(date, now = new Date()) {
    const week = 7 * 24 * 60 * 60 * 1000
    const day = 24 * 60 * 60 * 1000
    const hour = 60 * 60 * 1000
    const minute = 60 * 1000
    const range = now - date

    if (range < week) {
      if (range >= day) {
        const interval = Math.floor(range / day)
        if (interval === 1) {
          return `a day ago`
        }
        else {
          return `${interval} days ago`
        }
      }
      else if (range >= hour) {
        const interval = Math.floor(range / hour)
        if (interval === 1) {
          return `an hour ago`
        }
        else {
          return `${interval} hours ago`
        }
      }
      else if (range >= minute) {
        const interval = Math.floor(range / minute)
        if (interval === 1) {
          return `a minute ago`
        }
        else {
          return `${interval} minutes ago`
        }
      }
      else {
        return `just now`
      }
    }

    return date.toDateString()
  }
}