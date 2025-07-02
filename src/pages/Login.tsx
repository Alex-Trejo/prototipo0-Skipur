import { useNavigate } from 'react-router'
import { LoginForm, type FormValues } from '../components/forms/LoginForm'
import { login } from '../services/auth'
import { ROLE_HOME_PATHS } from '../constants/routes'
import { mapToLogin } from '../utils/auth'

export function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    const loginData = mapToLogin(values)
    const user = await login(loginData)
    navigate(ROLE_HOME_PATHS[user.role], { replace: true })
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
