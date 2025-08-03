import { getSpecialtyByIdService } from '../services/specialty'
import { useDataCache } from './useDataCache'

export function useSpecialtyCache(specialtyIds?: string[]) {
  const {
    getValue: getSpecialty,
    getValues: getSpecialties,
    loadValue: loadSpecialty,
  } = useDataCache({
    initialIds: specialtyIds,
    getValueAsync: getSpecialtyByIdService,
  })

  return {
    loadSpecialty,
    getSpecialty,
    getSpecialties,
  }
}
