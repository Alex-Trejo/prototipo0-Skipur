import { getAvailabilitiesByRangeDateRequest } from '../api/availability'
import { mapFromAvailabilityDto } from '../utils/availability'

interface GetAvailabilitiesByRangeDateOptions {
  startTime: Date
  endTime: Date
}

export async function getAvailablitiesByRangeDateService(
  specialistId: string,
  options: GetAvailabilitiesByRangeDateOptions
) {
  try {
    const dtos = await getAvailabilitiesByRangeDateRequest(
      specialistId,
      options
    )
    return dtos.map(mapFromAvailabilityDto)
  } catch {
    throw new Error('No hay horarios en el rango de fecha especificado')
  }
}
