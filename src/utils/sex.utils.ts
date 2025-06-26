import { Sex } from '../types/sex'

export function getSexLabel(sex: Sex): string {
  const dictionary: Record<Sex, string> = {
    [Sex.Female]: 'Mujer',
    [Sex.Male]: 'Hombre',
    [Sex.Other]: 'Otro',
  }

  return dictionary[sex] ?? 'Desconocido'
}

export function getSexOptions(): { value: Sex; label: string }[] {
  return Object.values(Sex).map((s) => {
    return { value: s, label: getSexLabel(s) }
  })
}

export function isSex(option: number): option is Sex {
  return Object.values(Sex).includes(option as Sex)
}
