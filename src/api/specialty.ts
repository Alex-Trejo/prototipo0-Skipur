import api from './api'
import type { SpecialtyDto, SpecialtyFormValues } from '../types/specialty'
import {
  mapFromSpecialtyDto,
  mapToCreateSpecialtyDto,
  mapToUpdateSpecialtyDto,
} from '../utils/specialty'

export async function getAllSpecialties() {
  try {
    const response = await api.get('/specialties')
    const data = response.data as SpecialtyDto[]
    const specialties = data.map(mapFromSpecialtyDto)
    return specialties
  } catch {
    throw new Error('No se pudo obtener las especialidades')
  }
}

export async function createSpecialty(newSpecialty: SpecialtyFormValues) {
  try {
    const specialtyDto = mapToCreateSpecialtyDto(newSpecialty)
    const response = await api.post('/specialties', specialtyDto)
    const data = response.data as SpecialtyDto
    return mapFromSpecialtyDto(data)
  } catch {
    throw new Error('No se pudo crear la especialidad')
  }
}

export async function updateSpecialty(updatedSpecialty: SpecialtyFormValues) {
  try {
    if (!updatedSpecialty.id) {
      throw new Error(
        'No se proporciono un ID valido para actualizar la especialidad'
      )
    }

    const specialtyDto = mapToUpdateSpecialtyDto(updatedSpecialty)
    const response = await api.put(
      `/specialties/${updatedSpecialty.id}`,
      specialtyDto
    )
    const data = response.data as SpecialtyDto
    const specialty = mapFromSpecialtyDto(data)
    return specialty
  } catch {
    throw new Error('No se pudo actualizar la especialidad')
  }
}

export async function deleteSpecialty(id: string) {
  try {
    await api.delete(`/specialties/${id}`)
  } catch {
    throw new Error('No se pudo eliminar la especialidad')
  }
}
