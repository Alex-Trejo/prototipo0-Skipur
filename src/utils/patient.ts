import type {
  PatientRegistrationDto,
  PatientRegistrationFormValues,
} from '../types/patient'

export function mapToPatientRegistrationDto(
  register: PatientRegistrationFormValues
): PatientRegistrationDto {
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
