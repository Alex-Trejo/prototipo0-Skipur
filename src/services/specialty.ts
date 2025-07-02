import {
  getSpecialtiesRequest,
  createSpecialtyRequest,
  updateSpecialtyRequest,
  deleteSpecialtyRequest,
} from '../api/specialty'
import type { CreateSpecialty, UpdateSpecialty } from '../types/specialty'
import {
  mapFromSpecialtyDto,
  mapToCreateSpecialtyDto,
  mapToUpdateSpecialtyDto,
} from '../utils/specialty'

export async function getSpecialties() {
  try {
    const dtos = await getSpecialtiesRequest()
    return dtos.map(mapFromSpecialtyDto)
  } catch {
    throw new Error('No se pudo obtener las especialidades')
  }
}

export async function createSpecialty(newSpecialty: CreateSpecialty) {
  try {
    const dto = mapToCreateSpecialtyDto(newSpecialty)
    const result = await createSpecialtyRequest(dto)
    return mapFromSpecialtyDto(result)
  } catch {
    throw new Error('No se pudo crear la especialidad')
  }
}

export async function updateSpecialty(
  id: string,
  updatedSpecialty: UpdateSpecialty
) {
  try {
    const dto = mapToUpdateSpecialtyDto(updatedSpecialty)
    const result = await updateSpecialtyRequest(id, dto)
    return mapFromSpecialtyDto(result)
  } catch {
    throw new Error('No se pudo actualizar la especialidad')
  }
}

export async function deleteSpecialty(id: string) {
  try {
    await deleteSpecialtyRequest(id)
  } catch {
    throw new Error('No se pudo eliminar la especialidad')
  }
}
