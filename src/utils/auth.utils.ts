import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN_KEY } from '../constants/auth.constants'
import type {
  AccessTokenPayload,
  AuthUser,
  Register,
  RegisterDto,
} from '../types/auth'
import { isUserRole } from './user.util'

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

export function getAuthUser(): AuthUser | null {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) return null
  const authUser = jwtDecode(token) as AccessTokenPayload

  if (!isUserRole(authUser.role)) throw new Error('Rol de usuario incorrecto')

  return {
    email: authUser.email,
    id: authUser.id,
    role: authUser.role,
  }
}
