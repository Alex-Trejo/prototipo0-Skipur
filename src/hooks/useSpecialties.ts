import { useEffect, useState } from 'react'
import { getAllSpecialties } from '../api/specialty'
import { type Specialty } from '../types/specialty'

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  useEffect(() => {
    getAllSpecialties().then((s) => setSpecialties(s))
  }, [])

  return {
    specialties,
  }
}
