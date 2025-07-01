import type { Sex } from './sex'

export interface Patient {
  full_name: string
  age: number
  gender: Sex
  condition?: string
}
export interface PatientRegistrationFormValues {
  representativeName: string
  representativeEmail: string
  representativePhone: string
  patientName: string
  patientAge: number
  patientSex: Sex
  medicalCondition: string
}
export interface PatientRegistrationDto {
  email: string
  full_name: string
  phone_number: string
  patient: Patient
}
