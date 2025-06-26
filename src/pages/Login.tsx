import { useNavigate } from 'react-router'
import { LoginForm, type FormValues } from '../components/forms/LoginForm'
import { login } from '../services/auth.service'

export function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    await login(values)
    navigate('/admin', { replace: true })
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
