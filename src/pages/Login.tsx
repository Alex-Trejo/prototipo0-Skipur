import { LoginForm } from '../components/forms/LoginForm'

interface LoginValues {
  email: string
  password: string
}

export function Login() {
  const handleSubmit = async ({ email, password }: LoginValues) => {
    console.log('email', email)
    console.log('password', password)
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
