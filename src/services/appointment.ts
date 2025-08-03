import { getMyAppointmentsRequest } from '../api/appointment'
import { mapFromUserAppointmentDto } from '../utils/appointment'

export async function getMyAppointmentsService() {
  try {
    const dtos = await getMyAppointmentsRequest()
    return dtos.map(mapFromUserAppointmentDto)
  } catch {
    throw new Error('No se pudo obtener las especialidades del usuario')
  }
}
