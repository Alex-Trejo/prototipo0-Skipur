export type WeekDayDto =
  | 'Lunes'
  | 'Martes'
  | 'Miercoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sabado'
  | 'Domingo'

type WorkTimeDto = `${number}:${number}`

export interface WorkRangeTimeDto {
  start: WorkTimeDto
  end: WorkTimeDto
}

export type ScheduleDto = Partial<Record<WeekDayDto, WorkRangeTimeDto[]>>

export interface AvailabilityDto {
  id: string
  specialist_id: string
  schedule: string
  created_at: string
}

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface WorkRangeTime {
  start: Date
  end: Date
}

export type Schedule = Partial<Record<WeekDay, WorkRangeTime[]>>

export interface Availability {
  id: string
  specialistId: string
  schedule: Schedule
  createdAt: Date
}

export interface CreateAvailability {
  schedule: Schedule
}

export interface CreateAvailabilityDto {
  schedule: ScheduleDto
}

export interface UpdateAvailability {
  schedule: Schedule
}

export interface UpdateAvailabilityDto {
  schedule: ScheduleDto
}
