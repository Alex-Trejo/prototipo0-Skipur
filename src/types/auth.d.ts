import type { Sex } from './sex'
import type { UserDto, UserRole } from './user'

export interface LoginResponseDto {
  token: string
  user: UserDto
}

export interface LoginDto {
  email: string
  password: string
}

export interface Register {
  representativeName: string
  representativeEmail: string
  representativePhone: string
  patientName: string
  patientAge: number
  patientSex: Sex
  medicalCondition: string
}

export interface RegisterDto {
  email: string
  full_name: string
  phone_number: string
  patient: Patient
}

export interface Patient {
  full_name: string
  age: number
  gender: string
  condition?: string
}

export interface AccessTokenPayload {
  id: string
  email: string
  role: string
  iat: number
  exp: number
}

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}
