import { useEffect, useState } from 'react'
import { getSpecialtyByIdService } from '../services/specialty'
import type { Specialty } from '../types/specialty'

export function useSpecialtyCache(specialtyIds?: string[]) {
  const [specialties, setSpecialties] = useState<Record<string, Specialty>>({})

  const loadSpecialty = async (id: string) => {
    const specialtyCached = specialties[id]

    if (specialtyCached) {
      return specialtyCached
    }

    const specialty = await getSpecialtyByIdService(id)

    setSpecialties((prev) => ({ ...prev, [id]: specialty }))

    return specialty
  }

  const getSpecialty = (id: string): Specialty | null => {
    return specialties[id] ?? null
  }

  const getSpecialties = () => {
    return Object.values(specialties)
  }

  useEffect(() => {
    if (!specialtyIds) return

    const idsToLoad = specialtyIds.filter((id) => !specialties[id])

    if (!idsToLoad.length) return

    Promise.all(idsToLoad.map(getSpecialtyByIdService)).then(
      (specialtiesFetched) => {
        setSpecialties((prev) => {
          const newMap = { ...prev }
          for (const specialty of specialtiesFetched) {
            newMap[specialty.id] = specialty
          }
          return newMap
        })
      }
    )
  }, [specialtyIds, specialties])

  return {
    loadSpecialty,
    getSpecialty,
    getSpecialties,
  }
}
