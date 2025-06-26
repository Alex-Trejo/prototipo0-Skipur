import type { Register, RegisterDto } from '../types/auth'

export function mapToRegisterDto(register: Register): RegisterDto {
  return {
    email: register.representativeEmail,
    full_name: register.representativeName,
    phone_number: register.representativePhone,
    patient: {
      age: register.patientAge,
      full_name: register.patientName,
      gender: register.patientSex,
      condition: register.medicalCondition,
    },
  }
}
