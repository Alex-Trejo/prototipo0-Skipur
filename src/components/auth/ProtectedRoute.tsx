import { Navigate, Outlet } from 'react-router'
import type { UserRole } from '../../types/user'
import { getAuthUser } from '../../services/auth'
import { ROLE_HOME_PATHS } from '../../constants/routes'

interface Props {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const authUser = getAuthUser()

  if (!authUser) {
    return <Navigate to={'/'} replace />
  }

  if (!allowedRoles.includes(authUser.role)) {
    return <Navigate to={ROLE_HOME_PATHS[authUser.role]} replace />
  }

  return <Outlet />
}
