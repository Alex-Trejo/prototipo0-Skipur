import { useNavigate } from 'react-router'
import { LoginForm, type FormValues } from '../components/forms/LoginForm'
import { login } from '../api/auth'
import { ROLE_HOME_PATHS } from '../constants/routes'

export function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    const user = await login(values)
    navigate(ROLE_HOME_PATHS[user.role], { replace: true })
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
