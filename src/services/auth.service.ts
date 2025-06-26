import type { LoginDto, LoginResponseDto, Register } from '../types/auth'
import api from '../config/api'
import { ACCESS_TOKEN_KEY } from '../constants/auth.constants'
import { mapFromUserDto } from '../utils/user.util'
import { mapToRegisterDto } from '../utils/auth.utils'

export async function login(data: LoginDto) {
  try {
    const response = await api.post('/auth/login', data)
    const responseData = response.data as LoginResponseDto
    localStorage.setItem(ACCESS_TOKEN_KEY, responseData.token)
    const user = mapFromUserDto(responseData.user)
    return user
  } catch {
    throw new Error('Email o contrasena incorrectos')
  }
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export async function register(register: Register) {
  try {
    const registerDto = mapToRegisterDto(register)
    await api.post('/auth/register', registerDto)
  } catch {
    throw new Error('El usuario no pudo ser registrado')
  }
}
