export interface Availability {
  id: string
  specialistId: string
  startTime: Date
  endTime: Date
  isBooked: boolean
}

export interface AvailabilityDto {
  id: string
  specialist_id: string
  start_time: string
  end_time: string
  is_booked: boolean
  created_at: string
}
