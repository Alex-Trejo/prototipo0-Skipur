import { Navigate, Outlet } from 'react-router'
import type { UserRole } from '../../types/user'
import { getAuthUser } from '../../utils/auth.utils'
import { HOME_PATH_BY_ROLE } from '../../constants/auth.constants'

interface Props {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const authUser = getAuthUser()

  if (!authUser) {
    return <Navigate to={'/'} replace />
  }

  if (!allowedRoles.includes(authUser.role)) {
    return <Navigate to={HOME_PATH_BY_ROLE[authUser.role]} replace />
  }

  return <Outlet />
}
