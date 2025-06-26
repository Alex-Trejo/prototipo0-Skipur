import type { UserRole } from '../types/user'

export const ACCESS_TOKEN_KEY = 'access_token'

export const HOME_PATH_BY_ROLE: Record<UserRole, string> = {
  ADMIN: '/admin',
  CLIENTE: '/client',
  ESPECIALISTA: '/specialist',
}
