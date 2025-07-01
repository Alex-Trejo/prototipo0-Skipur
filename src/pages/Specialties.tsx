import { SpecialtiesTable } from '../components/tables/SpecialtiesTable'
import { SearchForm } from '../components/forms/SearchForm'
import {
  type ModalData,
  SpecialtyModal,
} from '../components/modals/SpecialtyModal'
import { useEffect, useState } from 'react'
import type { Specialty, SpecialtyFormValues } from '../types/specialty'
import {
  MessageModal,
  type MessageModalData,
} from '../components/modals/MessageModal'
import { useSpecialties } from '../hooks/useSpecialties'
import {
  createSpecialty,
  deleteSpecialty,
  updateSpecialty,
} from '../api/specialty'

export function Specialties() {
  const { specialties: initialSpecialties } = useSpecialties()
  const [specialties, setSpecialties] =
    useState<Specialty[]>(initialSpecialties)
  const [specialtyModal, setSpecialtyModal] = useState<ModalData>({
    initialValues: undefined,
    mode: 'add',
    open: false,
  })
  const [messageModal, setMessageModal] = useState<MessageModalData>({
    message: '',
    title: 'Especialidad',
    open: false,
    type: 'info',
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

  const handleSearch = (search: string) => {
    setSpecialties((specialties) =>
      specialties.filter((s) =>
        s.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    )
  }

  useEffect(() => {
    setSpecialties(initialSpecialties)
  }, [initialSpecialties])

  const addSpecialty = async (specialty: SpecialtyFormValues) => {
    try {
      const newSpecialty = await createSpecialty(specialty)
      setSpecialties((specialties) => {
        const newSpecialties = [...specialties]
        newSpecialties.push(newSpecialty)
        return newSpecialties
      })
      closeSpecialtyModal()
      setMessageModal((m) => ({
        ...m,
        message: 'La especialidad fue agregada exitosamente',
        open: true,
        type: 'info',
      }))
    } catch {
      setMessageModal((m) => ({
        ...m,
        message: 'La especialidad no pudo ser creada, intentelo nuevamente',
        open: true,
        type: 'error',
      }))
    }
  }

  const modifySpecialty = async (specialty: SpecialtyFormValues) => {
    try {
      const updatedSpecialty = await updateSpecialty(specialty)
      setSpecialties((specialties) =>
        specialties.map((s) => (s.id === specialty.id ? updatedSpecialty : s))
      )
      closeSpecialtyModal()
      setMessageModal((m) => ({
        ...m,
        message: 'La especialidad se actualizo correctamente',
        open: true,
        type: 'info',
      }))
    } catch {
      setMessageModal((m) => ({
        ...m,
        message: 'La especialidad no se pudo modificar, intentelo nuevamente',
        open: true,
        type: 'error',
      }))
    }
  }

  const removeSpecialty = async (id: string) => {
    try {
      await deleteSpecialty(id)
      setSpecialties((specialties) => specialties.filter((s) => s.id !== id))
    } catch {
      setMessageModal((m) => ({
        ...m,
        message: 'La especialidad no pudo ser elminada',
        open: true,
        type: 'error',
      }))
    }
  }

  const closeMessageModal = () => {
    setMessageModal((modal) => ({ ...modal, open: false }))
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">Gestionar Especialidades</h1>
      <div className="flex justify-between items-center py-8">
        <SearchForm onSubmit={handleSearch} />
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
        onSubmit={
          specialtyModal.mode === 'add' ? addSpecialty : modifySpecialty
        }
      />
      <MessageModal
        message={messageModal.message}
        title={messageModal.title}
        open={messageModal.open}
        type={messageModal.type}
        onAccept={closeMessageModal}
      />
    </main>
  )
}
