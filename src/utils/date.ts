export function formatHour(date: Date | null) {
  const hour = date?.getHours().toString().padStart(2, '0')
  const minutes = date?.getMinutes().toString().padStart(2, '0')
  return `${hour}:${minutes}`
}

export function roundUpToNextHour(date: Date): Date {
  const result = new Date(date)
  const needsRounding = date.getMinutes() !== 0
  const nextHour = result.getHours() + (needsRounding ? 1 : 0)
  result.setHours(nextHour, 0, 0, 0)
  return result
}

export function roundDownHour(date: Date): Date {
  const result = new Date(date)
  result.setHours(date.getHours(), 0, 0, 0)
  return result
}

export function getStartWeek(): Date {
  const today = new Date()
  const startWeek = new Date()
  startWeek.setHours(0, 0, 0)
  startWeek.setDate(today.getDate() - today.getDay())
  return startWeek
}

export function getEndWeek(): Date {
  const today = new Date()
  const endWeek = new Date()
  const saturday = 6
  const daysUntilEndWeek = saturday - today.getDay()
  endWeek.setHours(23, 59, 59)
  endWeek.setDate(today.getDate() + daysUntilEndWeek)
  return endWeek
}
