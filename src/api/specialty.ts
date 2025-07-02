import type {
  CreateSpecialtyDto,
  SpecialtyDto,
  UpdateSpecialtyDto,
} from '../types/specialty'
import api from './api'

export async function getSpecialtiesRequest(): Promise<SpecialtyDto[]> {
  const response = await api.get('/specialties')
  return response.data as SpecialtyDto[]
}

export async function createSpecialtyRequest(
  dto: CreateSpecialtyDto
): Promise<SpecialtyDto> {
  const response = await api.post('/specialties', dto)
  return response.data as SpecialtyDto
}

export async function updateSpecialtyRequest(
  id: string,
  dto: UpdateSpecialtyDto
): Promise<SpecialtyDto> {
  const response = await api.put(`/specialties/${id}`, dto)
  return response.data as SpecialtyDto
}

export async function deleteSpecialtyRequest(id: string): Promise<void> {
  await api.delete(`/specialties/${id}`)
}
