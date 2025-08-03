import type {
  Appointment,
  AppointmentDto,
  AppointmentStatus,
  UserAppointment,
  UserAppointmentDto,
} from '../types/appointment'

export function mapFromAppointmentDto(dto: AppointmentDto): Appointment {
  return {
    availabilityId: dto.availability_id,
    createdAt: new Date(dto.created_at),
    id: dto.id,
    notes: dto.notes,
    patiendId: dto.patiend_id,
    specialistId: dto.specialist_id,
    status: dto.status,
    updatedAt: new Date(dto.updated_at),
  }
}

export function getAppointmentStatusLabel(status: AppointmentStatus): string {
  const dictionary: Record<AppointmentStatus, string> = {
    AGENDADA: 'Agendada',
    CANCELADA: 'Cancelada',
    COMPLETADA: 'Completada',
    NO_ASISTIO: 'No asistió',
    PENDIENTE_VERIFICACION: 'Pendiente de verificación',
    RESERVADA: 'Reservada',
  }

  return dictionary[status] ?? 'Desconocido'
}

export function mapFromUserAppointmentDto(
  dto: UserAppointmentDto
): UserAppointment {
  return {
    availability: {
      endTime: new Date(dto.availability.end_time),
      startTime: new Date(dto.availability.start_time),
    },
    availabilityId: dto.availability_id,
    createdAt: new Date(dto.created_at),
    id: dto.id,
    notes: dto.notes,
    patiendId: dto.patiend_id,
    specialistId: dto.specialist_id,
    specialistName: dto.specialist.full_name,
    specialtyName: dto.specialist.specialist_profile.specialty.name,
    status: dto.status,
    updatedAt: new Date(dto.updated_at),
  }
}
