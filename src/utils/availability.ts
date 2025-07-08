import type { Availability, AvailabilityDto } from '../types/availability'

export function mapFromAvailabilityDto(dto: AvailabilityDto): Availability {
  return {
    endTime: new Date(dto.end_time),
    id: dto.id,
    isBooked: dto.is_booked,
    specialistId: dto.specialist_id,
    startTime: new Date(dto.start_time),
  }
}
