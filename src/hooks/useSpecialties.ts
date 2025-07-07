import { useEffect, useState } from 'react'
import {
  type CreateSpecialty,
  type Specialty,
  type UpdateSpecialty,
} from '../types/specialty'
import {
  createSpecialty,
  deleteSpecialty,
  getSpecialties,
  updateSpecialty,
} from '../services/specialty'

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpecialties()
      .then((s) => setSpecialties(s))
      .catch(() => setSpecialties([]))
      .finally(() => setLoading(false))
  }, [])

  const add = async (specialty: CreateSpecialty) => {
    const newSpecialty = await createSpecialty(specialty)

    setSpecialties((specialties) => {
      const newSpecialties = [...specialties]
      newSpecialties.push(newSpecialty)
      return newSpecialties
    })
  }

  const update = async (id: string, specialty: UpdateSpecialty) => {
    const specialtyUpdated = await updateSpecialty(id, specialty)

    setSpecialties((specialties) => {
      const updatedSpecialties = specialties.map((s) =>
        s.id === specialtyUpdated.id ? specialtyUpdated : s
      )
      return updatedSpecialties
    })
  }

  const remove = async (id: string) => {
    await deleteSpecialty(id)

    setSpecialties((specialties) => specialties.filter((s) => s.id !== id))
  }

  return {
    specialties,
    loading,
    addSpecialty: add,
    updateSpecialty: update,
    deleteSpecialty: remove,
  }
}
