function getWeekDay(day: number) {
  switch (day) {
    case 1:
      return "Mon."
    case 2:
      return "Tues."
    case 3:
      return "Wed."
    case 4:
      return "Thur."
    case 5:
      return "Fri."
    case 6:
      return "Sat."
    case 0:
      return "Sun."
    default:
      return ""
  }
}

export default getWeekDay
