import { useEffect, useState } from 'react'
import type { UserAppointment } from '../types/appointment'
import { getMyAppointmentsService } from '../services/appointment'
import { useAuth } from './useAuth'

export function useUserAppointments() {
  const { authUser } = useAuth()
  const [appointments, setAppointments] = useState<UserAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyAppointmentsService()
      .then((appointments) => setAppointments(appointments))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }, [])

  const reserveAppointment = async (availabilityId: string) => {
    // TODO: create service to reserve appointment
    console.log('availability reserve', availabilityId)
    console.log('patient id', authUser?.id)
  }

  return {
    appointments,
    loading,
    reserveAppointment,
  }
}
