import { useEffect, useState } from 'react'
import type { Availability } from '../types/availability'
import { getAvailablitiesByRangeDateService } from '../services/availability'

interface Options {
  userId?: string
  startTime: string
  endTime: string
}

export function useAvailabilities({ userId, startTime, endTime }: Options) {
  const [availabilities, setAvailabilities] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    getAvailablitiesByRangeDateService({
      specialistId: userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    })
      .then((a) => setAvailabilities(a))
      .catch(() => setAvailabilities([]))
      .finally(() => setLoading(false))
  }, [startTime, endTime, userId])

  return {
    availabilities,
    loading,
  }
}
