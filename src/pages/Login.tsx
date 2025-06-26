import { useNavigate } from 'react-router'
import { LoginForm, type FormValues } from '../components/forms/LoginForm'
import { login } from '../services/auth.service'
import { HOME_PATH_BY_ROLE } from '../constants/auth.constants'

export function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    const user = await login(values)
    navigate(HOME_PATH_BY_ROLE[user.role], { replace: true })
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
