import type { UserAppointmentDto } from '../types/appointment'
import api from './api'

export async function getMyAppointmentsRequest(): Promise<
  UserAppointmentDto[]
> {
  const result = await api.get('/appointments/my-appointments')
  return result.data as UserAppointmentDto[]
}
