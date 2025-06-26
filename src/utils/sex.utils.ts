import { SexDict } from '../constants/sex.constants'
import type { Sex } from '../types/sex'

export function getSexLabel(sex: Sex): string {
  const dictionary: Record<Sex, string> = {
    FEMENINO: 'Mujer',
    MASCULINO: 'Hombre',
    OTRO: 'Otro',
  }

  return dictionary[sex as Sex] ?? 'Desconocido'
}

export function getSexOptions(): { value: Sex; label: string }[] {
  return Object.values(SexDict).map((s) => {
    return { value: s, label: getSexLabel(s) }
  })
}

export function isSex(option: unknown): option is Sex {
  return Object.values(SexDict).includes(option as Sex)
}
