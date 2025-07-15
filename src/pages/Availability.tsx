import { useEffect, useMemo, useState } from 'react'
import { Schedule } from '../components/calendars'
import { useAuth } from '../hooks/useAuth'
import { useAvailabilities } from '../hooks/useAvailabilities'
import { getEndWeek } from '../utils/date'
import type { ScheduleEvent } from '../components/calendars/Schedule'
import { useMessageModal } from '../hooks/useMessageModal'
import { MessageModal } from '../components/modals/MessageModal'
import type { CreateAvailability } from '../types/availability'

export function Availability() {
  const { authUser } = useAuth()

  const currentSunday = useMemo(() => {
    const firstDay = 1
    return getEndWeek(firstDay)
  }, [])

  const { availabilities, createAvailability } = useAvailabilities({
    userId: authUser?.id,
    end: currentSunday,
  })

  const [editable, setIsEditableSchedule] = useState(false)
  const { modal, openModal, closeAndResetModal } = useMessageModal({
    title: 'Disponibilidad',
  })

  const [events, setEvents] = useState<ScheduleEvent[]>([])

  useEffect(() => {
    if (!availabilities || !availabilities.length) {
      return
    }

    setEvents(
      availabilities.map((a) => ({
        start: a.startTime,
        end: a.endTime,
        id: a.id,
        color: 'seagreen',
      }))
    )
  }, [availabilities])

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        end,
        start,
        id: start.toISOString(),
        color: 'royalblue',
      },
    ])
  }

  const enableEditableSchedule = () => {
    setIsEditableSchedule(true)
  }

  const disableEditableSchedule = () => {
    setIsEditableSchedule(false)
  }

  const cancelScheduleChanges = () => {
    disableEditableSchedule()
    setEvents(
      availabilities.map((a) => ({
        start: a.startTime,
        end: a.endTime,
        id: a.id,
        color: 'seagreen',
      }))
    )
  }

  const saveScheduleChanges = async (newEvents: ScheduleEvent[]) => {
    if (!events) {
      return
    }

    try {
      await Promise.all(
        newEvents.map(async (event) => {
          const availability: CreateAvailability = {
            endTime: event.end,
            startTime: event.start,
          }

          return createAvailability(availability)
        })
      )

      closeAndResetModal()
      openModal({
        data: {
          icon: 'info',
          message: 'Horario actualizado correctamente',
        },
      })
      disableEditableSchedule()
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
    openModal({
      data: {
        message: '¿Estás seguro que deseas guardar los cambios?',
        icon: 'question',
      },
      buttons: [
        {
          label: 'Guardar',
          style: 'primary',
          onClick: () => {
            const newEvents = events.filter(
              (e) => !availabilities.some((a) => a.id === e.id)
            )
            saveScheduleChanges(newEvents)
          },
        },
        {
          label: 'Cancelar',
          style: 'error',
          onClick: closeAndResetModal,
        },
      ],
    })
  }

  const isScheduleModified = useMemo(() => {
    return events.length > availabilities.length
  }, [availabilities, events])

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
              disabled={!isScheduleModified}
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

      <Schedule editable={editable} events={events} onSelect={handleSelect} />

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
