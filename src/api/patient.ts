import type { PatientRegistrationFormValues } from '../types/patient'
import { mapToPatientRegistrationDto } from '../utils/patient'
import api from './api'

export async function createPatient(register: PatientRegistrationFormValues) {
  try {
    const patientRegistrationDto = mapToPatientRegistrationDto(register)
    await api.post('/auth/register', patientRegistrationDto)
  } catch {
    throw new Error('El usuario no pudo ser registrado')
  }
}
