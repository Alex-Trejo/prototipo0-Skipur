import { SpecialtiesTable } from '../components/tables/SpecialtiesTable'
import { SearchForm } from '../components/forms/SearchForm'
import {
  type ModalData,
  SpecialtyModal,
} from '../components/modals/SpecialtyModal'
import { useEffect, useState } from 'react'
import type { Specialty } from '../types/specialty'
import { MessageModal } from '../components/modals/MessageModal'
import { useSpecialties } from '../hooks/useSpecialties'
import {
  createSpecialty,
  deleteSpecialty,
  updateSpecialty,
} from '../services/specialty'
import type { FormValues } from '../components/forms/SpecialtyForm'
import { mapToUpdateSpecialty } from '../utils/specialty'
import { useMessageModal } from '../hooks/useMessageModal'

export function Specialties() {
  const { specialties: initialSpecialties } = useSpecialties()
  const [specialties, setSpecialties] =
    useState<Specialty[]>(initialSpecialties)
  const [specialtyModal, setSpecialtyModal] = useState<ModalData>({
    initialValues: undefined,
    mode: 'add',
    open: false,
  })
  const { modal, openModal, closeModal } = useMessageModal({
    title: 'Especialidad',
  })

  const openSpecialtyModal = (
    mode: ModalData['mode'],
    specialty?: Specialty
  ) => {
    setSpecialtyModal({
      mode,
      initialValues: specialty,
      open: true,
    })
  }

  const closeSpecialtyModal = () => {
    setSpecialtyModal((modal) => ({
      ...modal,
      open: false,
    }))
  }

  useEffect(() => {
    setSpecialties(initialSpecialties)
  }, [initialSpecialties])

  const addSpecialty = async (form: FormValues) => {
    const newSpecialty = await createSpecialty(form)

    setSpecialties((specialties) => {
      const newSpecialties = [...specialties]
      newSpecialties.push(newSpecialty)
      return newSpecialties
    })
    closeSpecialtyModal()
  }

  const handleSubmit = (form: FormValues, mode: ModalData['mode']) => {
    switch (mode) {
      case 'add':
        addSpecialty(form)
        break

      case 'edit':
        modifySpecialty(form)
        break
    }
  }

  const modifySpecialty = async (form: FormValues) => {
    const id = form.id
    const specialty = mapToUpdateSpecialty(form)

    if (!id)
      throw new Error(
        'No se ha proporcionado un ID de especialidad para actualizar'
      )

    const updatedSpecialty = await updateSpecialty(id, specialty)

    setSpecialties((specialties) =>
      specialties.map((s) => (s.id === id ? updatedSpecialty : s))
    )

    closeSpecialtyModal()
  }

  const removeSpecialty = async (id: string) => {
    try {
      await deleteSpecialty(id)
      setSpecialties((specialties) => specialties.filter((s) => s.id !== id))
    } catch {
      openModal({
        message: 'La especialidad no pudo ser elminada',
        type: 'error',
      })
    }
  }

  const handleError = async (mode: ModalData['mode']) => {
    const addErrorMessage =
      'La especialidad no pudo ser creada, intentelo nuevamente'
    const editErrorMessage =
      'La especialidad no se pudo modificar, intentelo nuevamente'
    openModal({
      message: mode === 'add' ? addErrorMessage : editErrorMessage,
      type: 'error',
    })
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">Gestionar Especialidades</h1>
      <div className="flex justify-between items-center py-8">
        <SearchForm />
        <button
          className="bg-blue-500 text-white p-2 rounded-md  h-fit"
          type="button"
          onClick={() => openSpecialtyModal('add')}
        >
          Agregar Especialidad
        </button>
      </div>
      <SpecialtiesTable
        specialties={specialties}
        onEdit={(specialty) => openSpecialtyModal('edit', specialty)}
        onDelete={(id) => removeSpecialty(id)}
      />
      <SpecialtyModal
        open={specialtyModal.open}
        initialValues={specialtyModal.initialValues}
        mode={specialtyModal.mode}
        onClose={closeSpecialtyModal}
        onSubmit={handleSubmit}
        onError={handleError}
      />
      <MessageModal
        message={modal.message}
        title={modal.title}
        open={modal.open}
        type={modal.type}
        onAccept={closeModal}
      />
    </main>
  )
}
