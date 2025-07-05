import { RegisterForm, type FormValues } from '../components/forms/RegisterForm'
import { MessageModal } from '../components/modals/MessageModal'
import { useNavigate } from 'react-router'
import { mapToRegistratePatient } from '../utils/patient'
import { registerPatient } from '../services/patient'
import { useMessageModal } from '../hooks/useMessageModal'

export function Register() {
  const navigate = useNavigate()
  const { modal, openModal, closeModal } = useMessageModal({
    title: 'Registrar Paciente',
  })

  const handleSubmit = async (values: FormValues) => {
    const registration = mapToRegistratePatient(values)

    await registerPatient(registration)

    openModal({
      type: 'info',
      message: 'El paciente se registro correctamente',
    })
  }

  const handleError = () => {
    openModal({
      type: 'error',
      message: 'No se pudo registrar el paciente, intentelo nuevamente',
    })
  }

  const navigateToLogin = () => navigate('/', { replace: true })

  return (
    <main className="bg-slate-300 min-h-dvh flex justify-center items-center p-10">
      <RegisterForm onSubmit={handleSubmit} onError={handleError} />
      <MessageModal
        type={modal.type}
        title={modal.title}
        message={modal.message}
        open={modal.open}
        onAccept={modal.type === 'info' ? navigateToLogin : closeModal}
      />
    </main>
  )
}
