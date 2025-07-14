import { WEEK_DAY_MAP } from '../constants/availability'
import type {
  Availability,
  AvailabilityDto,
  CreateAvailability,
  CreateAvailabilityDto,
  Schedule,
  ScheduleDto,
  UpdateAvailability,
  UpdateAvailabilityDto,
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

function getWeekDay(weekDay: WeekDayDto): WeekDay {
  return WEEK_DAY_MAP[weekDay]
}

function mapFromScheduleJson(json: string): Schedule {
  try {
    const scheduleDto = JSON.parse(json) as ScheduleDto

    const schedule: Schedule = {}

    for (const [key, value] of Object.entries(scheduleDto)) {
      schedule[getWeekDay(key as WeekDayDto)] = value.map(
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

function getWeekDayDto(weekDay: WeekDay): WeekDayDto {
  const weekDayKey = Object.keys(WEEK_DAY_MAP).find(
    (k) => WEEK_DAY_MAP[k as WeekDayDto] === weekDay
  )

  if (weekDayKey == null) {
    throw new Error('Invalidad week day')
  }

  return weekDayKey as WeekDayDto
}

function mapToWorkTimeDto(workTime: Date): WorkTimeDto {
  const hours = workTime.getHours().toString().padStart(2, '0')
  const minutes = workTime.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function mapToWorkRangeTimeDto(workRangeTime: WorkRangeTime): WorkRangeTimeDto {
  return {
    end: mapToWorkTimeDto(workRangeTime.end),
    start: mapToWorkTimeDto(workRangeTime.start),
  }
}

function mapToScheduleDto(schedule: Schedule): ScheduleDto {
  const dto: ScheduleDto = {}
  for (const [key, value] of Object.entries(schedule)) {
    const weekDay = Number(key)
    dto[getWeekDayDto(weekDay as WeekDay)] = value.map(mapToWorkRangeTimeDto)
  }

  return dto
}

export function mapToCreateAvailabilityDto(
  availability: CreateAvailability
): CreateAvailabilityDto {
  return {
    schedule: mapToScheduleDto(availability.schedule),
  }
}

export function mapToUpdateAvailabilityDto(
  availability: UpdateAvailability
): UpdateAvailabilityDto {
  return {
    schedule: mapToScheduleDto(availability.schedule),
  }
}
