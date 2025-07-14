import { useMemo, useState } from 'react'
import type {
  Availability,
  Schedule as ScheduleType,
  WeekDay,
  WorkRangeTime,
} from '../types/availability'
import { useAvailability } from '../hooks/useAvailability'
import { useAuth } from '../hooks/useAuth'
import { MessageModal } from '../components/modals/MessageModal'
import { useMessageModal } from '../hooks/useMessageModal'
import { Schedule } from '../components/calendars'

export function Availability() {
  const { authUser } = useAuth()

  const { availability, loading, modifySchedule } = useAvailability({
    userId: authUser?.id,
  })

  const [tempSchedule, setTempSchedule] = useState<ScheduleType>()

  const { modal, openModal, closeModal, closeAndResetModal } = useMessageModal({
    title: 'Disponibilidad',
  })

  const handleSelect = (weekDay: WeekDay, workRange: WorkRangeTime) => {
    setTempSchedule((schedule) => {
      const newSchedule = structuredClone(schedule)

      if (!newSchedule) {
        return schedule
      }

      let workDay = newSchedule[weekDay]

      if (!workDay) {
        workDay = []
      }

      workDay.push(workRange)
      newSchedule[weekDay] = workDay
      return newSchedule
    })
  }

  const handleDelete = (index: number, weekDay: WeekDay) => {
    setTempSchedule((schedule) => {
      if (!schedule) {
        return schedule
      }

      const newSchedule = structuredClone(schedule)
      const workDay = newSchedule[weekDay]

      if (workDay) {
        workDay.splice(index, 1)

        if (workDay.length) {
          newSchedule[weekDay] = workDay
        } else {
          delete newSchedule[weekDay]
        }
      }

      return newSchedule
    })
  }

  const enableEditableSchedule = () => {
    setTempSchedule(availability?.schedule ?? {})
  }

  const cancelScheduleChanges = () => {
    setTempSchedule(undefined)
  }

  const saveScheduleChanges = async () => {
    if (!tempSchedule) {
      return
    }

    try {
      await modifySchedule(tempSchedule)
      closeModal()
    } catch {
      openModal({
        data: {
          icon: 'error',
          message: 'No se pudieron guardar los cambios, intentelo más tarde',
        },
      })
    }
  }

  const handleSave = () => {
    const isEmpty = !tempSchedule || !Object.keys(tempSchedule).length

    if (isEmpty) {
      return
    }

    openModal({
      data: {
        message: '¿Estás seguro que deseas guardar los cambios?',
        icon: 'question',
      },
      buttons: [
        {
          label: 'Guardar',
          style: 'primary',
          onClick: saveScheduleChanges,
        },
        {
          label: 'Cancelar',
          style: 'error',
          onClick: closeAndResetModal,
        },
      ],
    })
  }

  const editable = useMemo(() => tempSchedule != null, [tempSchedule])

  return (
    <main className="p-8 h-dvh">
      <h1 className="text-4xl font-semibold">Gestionar Disponibilidad</h1>
      <div className="flex items-center justify-end gap-x-4 py-8">
        {!editable ? (
          <button
            className="bg-blue-500 text-white p-2 rounded-md h-fit ml-auto"
            type="button"
            onClick={enableEditableSchedule}
          >
            Modificar
          </button>
        ) : (
          <>
            <button
              className="bg-green-500 text-white p-2 rounded-md h-fit"
              type="button"
              onClick={handleSave}
            >
              Guardar cambios
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md h-fit"
              type="button"
              onClick={cancelScheduleChanges}
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      <Schedule
        editable={editable}
        loading={loading}
        schedule={tempSchedule}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      <MessageModal
        message={modal.message}
        title={modal.title}
        buttons={modal.buttons}
        icon={modal.icon}
        open={modal.open}
        onClose={closeAndResetModal}
      />
    </main>
  )
}
