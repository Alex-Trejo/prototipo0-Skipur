import type {
  Availability,
  AvailabilityDto,
  Schedule,
  ScheduleDto,
  WeekDay,
  WeekDayDto,
  WorkRangeTime,
  WorkRangeTimeDto,
  WorkTimeDto,
} from '../types/availability'

function mapFromWorkTimeDto(time: WorkTimeDto): Date {
  const [hour, minutes] = time.split(':').map(Number)
  const dateFormat = new Date()
  dateFormat.setHours(hour, minutes, 0, 0)
  return dateFormat
}

function mapFromWorkRangeTimeDto(dto: WorkRangeTimeDto): WorkRangeTime {
  return {
    end: mapFromWorkTimeDto(dto.end),
    start: mapFromWorkTimeDto(dto.start),
  }
}

function mapFromWeekDayDto(weekDay: WeekDayDto): WeekDay {
  const weekDayMap: Record<WeekDayDto, WeekDay> = {
    Domingo: 0,
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
  }

  return weekDayMap[weekDay]
}

function mapFromScheduleJson(json: string): Schedule {
  try {
    const scheduleDto = JSON.parse(json) as ScheduleDto

    const schedule: Schedule = {}

    for (const [key, value] of Object.entries(scheduleDto)) {
      schedule[mapFromWeekDayDto(key as WeekDayDto)] = value.map(
        mapFromWorkRangeTimeDto
      )
    }

    return schedule
  } catch {
    throw new Error(`Invalid schedule json: ${json}`)
  }
}

export function mapFromAvailabilityDto(dto: AvailabilityDto): Availability {
  return {
    id: dto.id,
    specialistId: dto.specialist_id,
    schedule: mapFromScheduleJson(dto.schedule),
    createdAt: new Date(dto.created_at),
  }
}
