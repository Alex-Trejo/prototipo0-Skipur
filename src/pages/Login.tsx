import { LoginForm, type FormValues } from '../components/forms/LoginForm'

export function Login() {
  const handleSubmit = async (values: FormValues) => {
    console.log('email', values.email)
    console.log('password', values.password)
  }

  return (
    <main className="bg-slate-300 h-dvh flex justify-center items-center">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  )
}
