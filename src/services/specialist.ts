import {
  createSpecialistRequest,
  deleteSpecialistRequest,
  getSpecialistsRequest,
  updateSpecialistRequest,
} from '../api/specialist'
import type { CreateSpecialist, UpdateSpecialist } from '../types/specialist'
import {
  mapFromSpecialistDto,
  mapToCreateSpecialistDto,
  mapToUpdateSpecialistDto,
} from '../utils/specialist'

interface GetSpecialistsOptions {
  includeInactive?: boolean
}

export async function getSpecialistsService(options?: GetSpecialistsOptions) {
  try {
    const dtos = await getSpecialistsRequest(options)
    return dtos.map(mapFromSpecialistDto)
  } catch {
    throw new Error('No se pudo obtener los especialistas')
  }
}

export async function createSpecialistService(newSpecialist: CreateSpecialist) {
  try {
    const dto = mapToCreateSpecialistDto(newSpecialist)
    const result = await createSpecialistRequest(dto)
    return mapFromSpecialistDto(result)
  } catch {
    throw new Error(
      'No se pudo registrar la informacion del nuevo especialista'
    )
  }
}

export async function updateSpecialistService(
  id: string,
  updatedSpecialist: UpdateSpecialist
) {
  try {
    const dto = mapToUpdateSpecialistDto(updatedSpecialist)
    const result = await updateSpecialistRequest(id, dto)
    return mapFromSpecialistDto(result)
  } catch {
    throw new Error('No se pudo actualizar la informacion del especialista')
  }
}

export async function deleteSpecialistService(id: string) {
  try {
    await deleteSpecialistRequest(id)
  } catch {
    throw new Error('No se pudo eliminar el especialista')
  }
}
