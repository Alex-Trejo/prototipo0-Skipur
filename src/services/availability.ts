import { getAvailabilitiesByRangeDateRequest } from '../api/availability'
import { mapFromAvailabilityDto } from '../utils/availability'

interface GetAvailabilitiesByRangeDateParams {
  specialistId: string
  startTime: Date
  endTime: Date
}

export async function getAvailablitiesByRangeDateService({
  specialistId,
  startTime,
  endTime,
}: GetAvailabilitiesByRangeDateParams) {
  try {
    const dtos = await getAvailabilitiesByRangeDateRequest(specialistId, {
      startTime,
      endTime,
    })
    return dtos.map(mapFromAvailabilityDto)
  } catch {
    throw new Error('No hay horarios en el rango de fecha especificado')
  }
}
