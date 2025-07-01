import type { LoginDto, LoginResponseDto } from '../types/auth'
import api from '../api/api'
import { mapFromUserDto } from '../utils/user'
import { setToken } from '../utils/storage'

export async function login(data: LoginDto) {
  try {
    const response = await api.post('/auth/login', data)
    const responseData = response.data as LoginResponseDto
    // TODO: single responsability
    setToken(responseData.token)
    const user = mapFromUserDto(responseData.user)
    return user
  } catch {
    throw new Error('Email o contraseña incorrectos')
  }
}
