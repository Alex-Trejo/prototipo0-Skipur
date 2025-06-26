import api from '../config/api'
import type { Specialty, SpecialtyDto } from '../types/specialty'
import {
  mapFromSpecialtyDto,
  mapToPostSpecialtyDto,
  mapToPutSpecialtyDto,
} from '../utils/specialty.util'

export async function getAllSpecialties() {
  try {
    const response = await api.get('/specialties')
    const data = response.data as SpecialtyDto[]
    return data.map(mapFromSpecialtyDto)
  } catch {
    throw new Error('No se pudo obtener las especialidades')
  }
}

export async function createSpecialty(newSpecialty: Specialty) {
  try {
    const specialtyDto = mapToPostSpecialtyDto(newSpecialty)
    const response = await api.post('/specialties', specialtyDto)
    const data = response.data as SpecialtyDto
    return mapFromSpecialtyDto(data)
  } catch {
    throw new Error('No se pudo crear la especialidad')
  }
}

export async function updateSpecialty(updatedSpecialty: Specialty) {
  try {
    const specialtyDto = mapToPutSpecialtyDto(updatedSpecialty)
    const response = await api.put(
      `/specialties/${updatedSpecialty.id}`,
      specialtyDto
    )
    const data = response.data as SpecialtyDto
    return mapFromSpecialtyDto(data)
  } catch {
    throw new Error('No se pudo crear la especialidad')
  }
}

export async function deleteSpecialty(id: string) {
  try {
    await api.delete(`/specialties/${id}`)
  } catch {
    throw new Error('No se pudo crear la especialidad')
  }
}
