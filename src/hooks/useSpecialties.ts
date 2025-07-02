import { useEffect, useState } from 'react'
import { type Specialty } from '../types/specialty'
import { getSpecialties } from '../services/specialty'

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  useEffect(() => {
    getSpecialties().then((s) => setSpecialties(s))
  }, [])

  return {
    specialties,
  }
}
