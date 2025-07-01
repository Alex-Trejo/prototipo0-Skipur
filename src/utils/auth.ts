import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN_KEY } from '../constants/storage'
import type { AccessTokenPayload, AuthUser } from '../types/auth'
import { isUserRole } from './user'
import { removeToken } from './storage'

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

export function logout() {
  removeToken()
}
