import { useEffect, useState } from 'react'
import { Schedule } from '../components/calendars/Schedule'
import type {
  Availability,
  Schedule as ScheduleType,
  WeekDay,
  WorkRangeTime,
} from '../types/availability'

export function Availabilities() {
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [tempSchedule, setTempSchedule] = useState<ScheduleType>({})
  const [editable, setIsEditable] = useState(false)

  useEffect(() => {
    if (!availability) {
      return
    }

    setTempSchedule(availability.schedule)
  }, [availability])

  const handleSelect = (weekDay: WeekDay, workRange: WorkRangeTime) => {
    setTempSchedule((availability) => {
      const newSchedule = structuredClone(availability)
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
    setTempSchedule((availability) => {
      if (!availability) {
        return availability
      }

      const newSchedule = structuredClone(availability)
      const workDay = newSchedule[weekDay]

      if (workDay) {
        workDay.splice(index)
        newSchedule[weekDay] = workDay
      }

      return newSchedule
    })
  }

  const enableEditableSchedule = () => setIsEditable(true)

  const disableEditableSchedule = () => setIsEditable(false)

  const cancelScheduleChanges = () => {
    if (!availability) {
      setTempSchedule({})
    } else {
      setTempSchedule(availability.schedule)
    }

    disableEditableSchedule()
  }

  const saveScheduleChanges = () => {
    setAvailability((availability) => {
      if (!availability) {
        return availability
      }

      const newAvailability = structuredClone(availability)
      newAvailability.schedule = tempSchedule
      return newAvailability
    })

    disableEditableSchedule()
  }

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
              onClick={saveScheduleChanges}
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
        schedule={tempSchedule}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    </main>
  )
}
