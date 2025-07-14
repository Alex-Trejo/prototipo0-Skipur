import type {
  AvailabilityDto,
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from '../types/availability'
import api from './api'

export async function getAvailabilityBySpecialistIdRequest(
  specialistId: string
): Promise<AvailabilityDto> {
  const response = await api.get(`/availabilities/specialist/${specialistId}`)
  return response.data as AvailabilityDto
}

export async function createAvailabilityRequest(
  dto: CreateAvailabilityDto
): Promise<AvailabilityDto> {
  const response = await api.post('/availabilities', dto)
  return response.data as AvailabilityDto
}

export async function updateAvailabilityRequest(
  id: string,
  dto: UpdateAvailabilityDto
): Promise<AvailabilityDto> {
  const response = await api.put(`/availabilities/${id}`, dto)
  return response.data as AvailabilityDto
}
