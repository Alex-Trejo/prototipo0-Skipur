import { useMemo, useState } from 'react'
import { MessageModal } from '../components/modals/MessageModal'
import {
  SpecialistModal,
  type SpecialistModalData,
} from '../components/modals/SpecialistModal'
import { SpecialistsTable } from '../components/tables/SpecialistsTable'
import { useMessageModal } from '../hooks/useMessageModal'
import { useSpecialists } from '../hooks/useSpecialists'
import type { Specialist } from '../types/specialist'
import type { FormValues } from '../components/forms/SpecialistForm'
import {
  mapToCreateSpecialist,
  mapToUpdateSpecialist,
} from '../utils/specialist'
import { SearchForm } from '../components/forms/SearchForm'
import { useSearch } from '../hooks/useSearch'

export function Specialists() {
  const {
    specialists,
    loading,
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,
  } = useSpecialists()

  const { modal, openModal, closeAndResetModal, closeModal } = useMessageModal({
    title: 'Especialista',
  })

  const [specialistModal, setSpecialistModal] = useState<SpecialistModalData>({
    initialValues: undefined,
    open: false,
  })

  const filterByName = (specialist: Specialist, query: string) => {
    return specialist.fullName
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase())
  }

  const [filteredSpecialists, { reset, search }] = useSearch(specialists, {
    filterBy: filterByName,
  })

  const openSpecialistModal = (
    mode: SpecialistModalData['mode'],
    specialist?: Specialist
  ) => {
    setSpecialistModal({
      mode,
      initialValues: specialist,
      open: true,
    })
  }

  const closeSpecialistModal = () => {
    setSpecialistModal((modal) => ({
      ...modal,
      open: false,
    }))
  }

  const addSpecialist = async (form: FormValues) => {
    const specialist = mapToCreateSpecialist(form)
    await createSpecialist(specialist)
    closeSpecialistModal()
  }

  const modifySpecialist = async (form: FormValues) => {
    const id = form.id

    if (!id)
      throw new Error(
        'No se ha proporcionado un ID de especialidad para actualizar'
      )

    const specialist = mapToUpdateSpecialist(form)
    await updateSpecialist(id, specialist)

    closeSpecialistModal()
  }

  const removeSpecialist = async (id: string) => {
    try {
      await deleteSpecialist(id)
      closeModal()
    } catch {
      showError('delete')
    }
  }

  const handleSubmit = async (
    form: FormValues,
    mode: SpecialistModalData['mode']
  ) => {
    switch (mode) {
      case 'add':
        await addSpecialist(form)
        break

      case 'edit':
        await modifySpecialist(form)
        break
    }
  }

  const showError = async (
    mode: NonNullable<SpecialistModalData['mode']> | 'delete'
  ) => {
    const messages: Record<typeof mode, string> = {
      add: 'El especialista no pudo ser creado, intentelo más tarde',
      edit: 'El especialista no se pudo modificado, intentelo más tarde',
      delete: 'El especialista no pudo ser eliminado, intentelo más tarde',
    }

    openModal({
      data: {
        message: messages[mode],
        icon: 'error',
      },
    })
  }

  const handleDelete = async (specialist: Specialist) => {
    openModal({
      data: {
        message: `¿Estas seguro que deseas eliminar al especialista "${specialist.fullName}"?`,
        icon: 'danger',
      },
      buttons: [
        {
          label: 'Eliminar',
          style: 'error',
          onClick: () => removeSpecialist(specialist.id),
        },
        {
          label: 'Cancelar',
          onClick: closeAndResetModal,
        },
      ],
    })
  }

  const specialistsToShow = useMemo(() => {
    return filteredSpecialists.length < specialists.length
      ? filteredSpecialists
      : specialists
  }, [filteredSpecialists, specialists])

  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">Gestionar Especialistas</h1>
      <div className="flex justify-between items-center py-8">
        <SearchForm placeholder="Jane Doe" onSubmit={search} onReset={reset} />
        <button
          className="bg-blue-500 text-white p-2 rounded-md  h-fit"
          type="button"
          onClick={() => openSpecialistModal('add')}
        >
          Agregar Especialista
        </button>
      </div>
      <SpecialistsTable
        specialists={specialistsToShow}
        loading={loading}
        onEdit={(specialty) => openSpecialistModal('edit', specialty)}
        onDelete={handleDelete}
      />
      <SpecialistModal
        open={specialistModal.open}
        initialValues={specialistModal.initialValues}
        mode={specialistModal.mode}
        onClose={closeSpecialistModal}
        onSubmit={handleSubmit}
        onError={showError}
      />
      <MessageModal
        message={modal.message}
        title={modal.title}
        open={modal.open}
        icon={modal.icon}
        buttons={modal.buttons}
        onClose={closeAndResetModal}
      />
    </main>
  )
}
