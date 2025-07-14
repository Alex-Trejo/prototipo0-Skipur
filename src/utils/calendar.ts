import type { EventInput } from '@fullcalendar/core/index.js'
import type { Schedule } from '../types/availability'
import { formatHour } from './date'

export function mapScheduleToEventsForWeek(schedule: Schedule): EventInput[] {
  const result: EventInput[] = []

  for (const [weekDayKey, workRanges] of Object.entries(schedule)) {
    const dayOfWeek = Number(weekDayKey)

    let workTimeIndex = 0
    for (const workTime of workRanges) {
      result.push({
        id: `${weekDayKey}-${workTime.start.toUTCString()}`,
        daysOfWeek: [dayOfWeek],
        startTime: formatHour(workTime.start),
        endTime: formatHour(workTime.end),
        color: 'oklch(0.623 0.214 259.815)',
        extendedProps: {
          index: workTimeIndex,
        },
      })

      ++workTimeIndex
    }
  }

  return result
}
