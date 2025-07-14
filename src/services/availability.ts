import {
  createAvailabilityRequest,
  getAvailabilityBySpecialistIdRequest,
  updateAvailabilityRequest,
} from '../api/availability'
import type {
  CreateAvailability,
  UpdateAvailability,
} from '../types/availability'
import {
  mapFromAvailabilityDto,
  mapToCreateAvailabilityDto,
  mapToUpdateAvailabilityDto,
} from '../utils/availability'

export async function getAvailablityBySpecialistIdService(
  specialistId: string
) {
  try {
    const dto = await getAvailabilityBySpecialistIdRequest(specialistId)
    return mapFromAvailabilityDto(dto)
  } catch {
    throw new Error('El usuario no tiene registrado ningun horario')
  }
}

export async function createAvailabilityService(
  newAvailability: CreateAvailability
) {
  try {
    const dto = mapToCreateAvailabilityDto(newAvailability)
    const result = await createAvailabilityRequest(dto)
    return mapFromAvailabilityDto(result)
  } catch {
    throw new Error('No se pudo registrar el horario')
  }
}

export async function updateAvailabilityService(
  id: string,
  updateAvailability: UpdateAvailability
) {
  try {
    const dto = mapToUpdateAvailabilityDto(updateAvailability)
    const result = await updateAvailabilityRequest(id, dto)
    return mapFromAvailabilityDto(result)
  } catch {
    throw new Error('No se pudo actualizar el horario del especialista')
  }
}
