import { FaXmark } from 'react-icons/fa6'
import { formatHour } from '../../utils/date'
import type { WeekDay } from '../../types/availability'

interface Props {
  index: number
  start: Date | null
  end: Date | null
  editable?: boolean
  onDelete?: (index: number, weekDay: WeekDay) => Promise<void> | void
}

export function ScheduleEventContent({
  index,
  start,
  end,
  editable = true,
  onDelete,
}: Props) {
  const handleDelete = () => {
    if (start?.getDay() == null) return
    onDelete?.(index, start.getDay() as WeekDay)
  }

  return (
    <div className="text-xs flex justify-between items-start not-italic p-1">
      <span>
        <time dateTime={start?.toISOString()}>{formatHour(start)}</time> -{' '}
        <time dateTime={end?.toISOString()}>{formatHour(end)}</time>
      </span>
      <button
        type="button"
        onClick={handleDelete}
        aria-label="Eliminar horario"
        disabled={!editable}
      >
        <FaXmark />
      </button>
    </div>
  )
}
