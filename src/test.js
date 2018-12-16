import U from './Utils'

it('parse date and tz correctly', () => {
  // Ensure we use UTC to do the test
  expect(process.env.TZ).toEqual('UTC')

  let parsed = U.parseDateAndTz('Wed Jan 10 2018 01:00:00 GMT+0000')
  expect(parsed.getHours()).toEqual(1)

  parsed = U.parseDateAndTz('Wed Jan 10 2018 01:00:00 GMT+0130')
  expect(parsed.getHours()).toEqual(23)
  expect(parsed.getMinutes()).toEqual(30)

  parsed = U.parseDateAndTz('Wed Jan 10 2018 01:00:00 GMT-0130')
  expect(parsed.getHours()).toEqual(2)
  expect(parsed.getMinutes()).toEqual(30)

  parsed = U.parseDateAndTz('Wed Jan 10 2018 01:00:00 GMT+1030')
  expect(parsed.getHours()).toEqual(14)
  expect(parsed.getMinutes()).toEqual(30)
  expect(parsed.getDate()).toEqual(9)

  parsed = U.parseDateAndTz('Wed Jan 10 2018 23:00:00 GMT-1030')
  expect(parsed.getHours()).toEqual(9)
  expect(parsed.getMinutes()).toEqual(30)
  expect(parsed.getDate()).toEqual(11)
})

it('format date correctly', () => {
  const now = new Date()
  const date = new Date()
  const day = 24 * 60 * 60 * 1000
  const hour = 60 * 60 * 1000
  const minute = 60 * 1000
  const second = 1000

  date.setTime(now.getTime() - 1 * day)
  expect(U.formatDate(date, now)).toEqual('a day ago')

  date.setTime(now.getTime() - 6 * day)
  expect(U.formatDate(date, now)).toEqual('6 days ago')

  date.setTime(now.getTime() - 7 * day)
  expect(U.formatDate(date, now)).toEqual(date.toDateString())

  date.setTime(now.getTime() - 1 * hour)
  expect(U.formatDate(date, now)).toEqual('an hour ago')

  date.setTime(now.getTime() - 23 * hour)
  expect(U.formatDate(date, now)).toEqual('23 hours ago')

  date.setTime(now.getTime() - 24 * hour)
  expect(U.formatDate(date, now)).toEqual('a day ago')

  date.setTime(now.getTime() - 1 * minute)
  expect(U.formatDate(date, now)).toEqual('a minute ago')

  date.setTime(now.getTime() - 59 * minute)
  expect(U.formatDate(date, now)).toEqual('59 minutes ago')

  date.setTime(now.getTime() - 60 * minute)
  expect(U.formatDate(date, now)).toEqual('an hour ago')

  date.setTime(now.getTime() - 59 * second)
  expect(U.formatDate(date, now)).toEqual('just now')
})
