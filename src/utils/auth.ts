import type { FormValues } from '../components/forms/LoginForm'
import type { AccessTokenPayload, AuthUser, Login } from '../types/auth'
import { isUserRole } from './user'

export function mapFromAccessTokenPayload(
  tokenPayload: AccessTokenPayload
): AuthUser {
  if (!isUserRole(tokenPayload.role))
    throw new Error('Rol de usuario incorrecto')

  return {
    email: tokenPayload.email,
    id: tokenPayload.id,
    role: tokenPayload.role,
  }
}

export function mapToLogin(form: FormValues): Login {
  return {
    email: form.email,
    password: form.password,
  }
}
