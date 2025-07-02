import type { UserDto, UserRole } from './user'

export interface Login {
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  token: string
  user: UserDto
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
