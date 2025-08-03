import { useEffect, useState } from 'react'
import type { UserAppointment } from '../types/appointment'
import { getMyAppointmentsService } from '../services/appointment'

export function useUserAppointments() {
  const [appointments, setAppointments] = useState<UserAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyAppointmentsService()
      .then((appointments) => setAppointments(appointments))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }, [])

  /* useEffect(() => {
    console.log(appointments)
  }, [appointments]) */

  return {
    appointments,
    loading,
  }
}
