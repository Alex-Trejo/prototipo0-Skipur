import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import type { AllowFunc, DateSelectArg } from '@fullcalendar/core/index.js'
import { useMemo, useRef } from 'react'
import type { Schedule, WeekDay, WorkRangeTime } from '../../types/availability'
import { mapScheduleToEventsForWeek } from '../../utils/calendar'
import { ScheduleEventContent } from './ScheduleEventContent'
import { roundDownHour, roundUpToNextHour } from '../../utils/date'
import { ImSpinner8 } from 'react-icons/im'

interface Props {
  schedule?: Schedule
  editable?: boolean
  loading?: boolean
  onSelect?: (
    weekDay: WeekDay,
    workRange: WorkRangeTime
  ) => Promise<void> | void
  onDelete?: (index: number, weekDay: WeekDay) => Promise<void> | void
}

export function Schedule({
  schedule,
  editable = false,
  loading = false,
  onSelect,
  onDelete,
}: Props) {
  const ref = useRef<FullCalendar>(null)

  const handleSelectAllow: AllowFunc = ({ start, end }) => {
    const isSameDay = start.getDay() === end.getDay()
    return isSameDay
  }

  const handleDateSelect = ({ start, end }: DateSelectArg) => {
    onSelect?.(start.getDay() as WeekDay, {
      start: roundDownHour(start),
      end: roundUpToNextHour(end),
    })
  }

  const handleDeleteEvent = (index: number, weekDay: WeekDay) => {
    if (!editable) return
    onDelete?.(index, weekDay)
  }

  const events = useMemo(() => {
    if (!schedule) return []
    return mapScheduleToEventsForWeek(schedule)
  }, [schedule])

  return (
    <div className="relative">
      {loading && (
        <span className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center gap-x-2 flex z-10 pointer-events-non backdrop-blur-xs">
          <ImSpinner8 className="animate-spin" /> <p>Cargando</p>
        </span>
      )}
      <FullCalendar
        ref={ref}
        plugins={[timeGridPlugin, interactionPlugin]}
        locale={esLocale}
        initialView="timeGridWeek"
        allDaySlot={false}
        events={events}
        headerToolbar={false}
        dayHeaderFormat={{ weekday: 'long' }}
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        slotMinTime={'05:00:00'}
        slotMaxTime={'21:00:00'}
        height={'auto'}
        stickyHeaderDates={false}
        selectOverlap={false}
        selectable={editable}
        selectAllow={handleSelectAllow}
        select={handleDateSelect}
        eventContent={({
          event: {
            start,
            end,
            extendedProps: { index },
          },
        }) => (
          <ScheduleEventContent
            index={index}
            start={start}
            end={end}
            onDelete={handleDeleteEvent}
            editable={editable}
          />
        )}
      />
    </div>
  )
}
