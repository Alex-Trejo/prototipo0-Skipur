import { useState } from 'react'
import { RegisterForm, type FormValues } from '../components/forms/RegisterForm'
import { Modal, type ModalData } from '../components/modals/Modal'
import { useNavigate } from 'react-router'

export function Register() {
  const navigate = useNavigate()
  const [modalData, setModalData] = useState<ModalData>({
    message: '',
    open: false,
    title: 'Registro de nuevo paciente',
    type: 'info',
  })

  const handleSubmit = async (values: FormValues) => {
    console.log(values)

    setModalData((data) => ({
      ...data,
      open: true,
      type: 'info',
      message: 'El paciente se registro correctamente',
    }))
  }

  const handleError = () => {
    setModalData((data) => ({
      ...data,
      open: true,
      type: 'error',
      message: 'No se pudo registrar el paciente, intentelo nuevamente',
    }))
  }

  const closeModal = () =>
    setModalData((data) => ({
      ...data,
      open: false,
    }))

  const navigateToLogin = () => navigate('/', { replace: true })

  return (
    <main className="bg-slate-300 min-h-dvh flex justify-center items-center p-10">
      <RegisterForm onSubmit={handleSubmit} onError={handleError} />
      <Modal
        type={modalData.type}
        title={modalData.title}
        message={modalData.message}
        open={modalData.open}
        onAccept={modalData.type === 'info' ? navigateToLogin : closeModal}
      />
    </main>
  )
}
