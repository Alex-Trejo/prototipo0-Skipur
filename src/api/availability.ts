import type { AvailabilityDto } from '../types/availability'
import { buildApiRequestParams, type QueryParamsMapper } from '../utils/api'
import api from './api'

interface GetAvailabilitiesByRangeDateQueryParams {
  startTime: Date
  endTime: Date
}

export async function getAvailabilitiesByRangeDateRequest(
  specialistId: string,
  { startTime, endTime }: GetAvailabilitiesByRangeDateQueryParams
): Promise<AvailabilityDto[]> {
  const queryParamsMap: QueryParamsMapper<GetAvailabilitiesByRangeDateQueryParams> =
    {
      startTime: {
        param: 'start',
        value: startTime,
        parser: (date: Date) => date.toISOString(),
      },
      endTime: {
        param: 'end',
        value: endTime,
        parser: (date: Date) => date.toISOString(),
      },
    }

  const params = buildApiRequestParams(queryParamsMap)
  const response = await api.get(`/availabilities/specialist/${specialistId}`, {
    params,
  })
  return response.data as AvailabilityDto[]
}
