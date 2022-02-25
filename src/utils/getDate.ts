function getDate(timeStamp: number) {
  const day = new Date(timeStamp)

  const newTimestamp = new Date(timeStamp).getTime()
  const valid = !isNaN(newTimestamp) && isFinite(newTimestamp)

  if (!valid) {
    return {}
  }

  return { month: day.getMonth() + 1, day: day.getDate() }
}

export default getDate
