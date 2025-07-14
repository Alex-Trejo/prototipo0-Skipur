import type { WeekDay, WeekDayDto } from '../types/availability'

export const WEEK_DAY_MAP: Record<WeekDayDto, WeekDay> = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sabado: 6,
}
