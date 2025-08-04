import { useMemo, useState } from 'react'
import { AppointmentCalendar } from '../components/calendars'
import { SpecialistSelect } from '../components/selects/SpecialistSelect'
import { useAvailabilities } from '../hooks/useAvailabilities'
import { useUserAppointments } from '../hooks/useUserAppointments'
import { getAppointmentStatusColor } from '../utils/appointment'

export function ScheduleAppointment() {
  const [specialistId, setSpecialtyId] = useState(
    'dcdce320-b1d6-4536-8fe4-44fe7f7e8717'
  )

  const { availabilities, loading: loadingAvailabilities } = useAvailabilities({
    // TODO: replace for dynamic id of specialist select
    userId: specialistId,
  })

  const { appointments, loading: loadingAppointments } = useUserAppointments()

  const handleSpecialtySelectChange = (id: string) => {
    setSpecialtyId(id)
  }

  const schedule = useMemo(() => {
    return availabilities.map((availability) => ({
      id: availability.id,
      start: availability.startTime,
      end: availability.endTime,
      backgroundColor: availability.isBooked ? '#f87171' : '#a3e635',
      borderColor: availability.isBooked ? '#f87171' : '#a3e635',
      textColor: 'black',
      display: 'background',
    }))
  }, [availabilities])

  const appointmentsEvents = useMemo(() => {
    return appointments
      .filter((a) => a.specialistId === specialistId)
      .map((appointment) => ({
        id: appointment.id,
        start: appointment.availability.startTime,
        end: appointment.availability.endTime,
        color: getAppointmentStatusColor(appointment.status),
      }))
  }, [appointments, specialistId])

  return (
    <main className="p-8 h-dvh">
      <h1 className="text-4xl font-semibold">Agendar cita</h1>
      <SpecialistSelect onChange={handleSpecialtySelectChange} />
      <div className="flex items-center justify-end gap-x-4 py-8">
        <AppointmentCalendar
          appointments={appointmentsEvents}
          schedule={schedule}
          loading={loadingAppointments || loadingAvailabilities}
        />
      </div>
    </main>
  )
}
