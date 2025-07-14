import { useEffect, useState } from 'react'
import type {
  Availability,
  CreateAvailability,
  Schedule,
  UpdateAvailability,
} from '../types/availability'
import {
  createAvailabilityService,
  getAvailablityBySpecialistIdService,
  updateAvailabilityService,
} from '../services/availability'

interface Options {
  userId?: string
}

export function useAvailability({ userId }: Options) {
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    getAvailablityBySpecialistIdService(userId)
      .then((a) => setAvailability(a))
      .catch(() => setAvailability(null))
      .finally(() => setLoading(false))
  }, [userId])

  const createAvailability = async (availability: CreateAvailability) => {
    const createdAvailability = await createAvailabilityService(availability)
    setAvailability(createdAvailability)
  }

  const updateAvailability = async (
    id: string,
    availability: UpdateAvailability
  ) => {
    const updatedAvailability = await updateAvailabilityService(
      id,
      availability
    )

    setAvailability(updatedAvailability)
  }

  const modifySchedule = async (newSchedule: Schedule) => {
    if (!availability?.id) {
      const newAvailability: CreateAvailability = {
        schedule: newSchedule,
      }
      await createAvailability(newAvailability)
    } else {
      const newAvailability: UpdateAvailability = {
        schedule: newSchedule,
      }

      await updateAvailability(availability.id, newAvailability)
    }
  }

  return {
    availability,
    loading,
    modifySchedule,
  }
}
