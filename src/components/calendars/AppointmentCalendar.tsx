import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { useMemo, useRef } from 'react'
import { IconFactory } from '../factory/IconFactory'
import type { DatesSetArg } from '@fullcalendar/core/index.js'

export interface AppointmentEvent {
  id: string
  start: Date
  end: Date
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  display?: string
}

export interface ScheduleEvent {
  id: string
  start: Date
  end: Date
  color?: string
}

interface Props {
  appointments: AppointmentEvent[]
  schedule: ScheduleEvent[]
  loading?: boolean
  minTime?: string
  maxTime?: string
  onDateChange?: ({ start, end }: { start: Date; end: Date }) => Promise<void>
}

export function AppointmentCalendar({
  schedule,
  appointments,
  loading = false,
  minTime = '05:00:00',
  maxTime = '21:00:00',
  onDateChange,
}: Props) {
  const ref = useRef<FullCalendar>(null)

  const handleNavLinkDay = async (date: Date) => {
    const calendarApi = ref.current?.getApi()
    if (!calendarApi) return

    const currentView = calendarApi.view.type
    const isWeekView = currentView === 'timeGridWeek'

    const nextView = isWeekView ? 'timeGridDay' : 'timeGridWeek'
    calendarApi.changeView(nextView, date)
  }

  const handleDateChange = async (arg: DatesSetArg) => {
    await onDateChange?.({ start: arg.start, end: arg.end })
  }

  const events = useMemo(() => {
    return [...schedule, ...appointments]
  }, [schedule, appointments])

  return (
    <div className="relative">
      {loading && (
        <span className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center gap-x-2 flex z-10 pointer-events-non backdrop-blur-xs">
          <IconFactory name="loading" className="animate-spin" />{' '}
          <p>Cargando</p>
        </span>
      )}
      <FullCalendar
        ref={ref}
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        locale={esLocale}
        initialView="timeGridWeek"
        firstDay={0}
        allDaySlot={false}
        height={'auto'}
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        slotMinTime={minTime}
        slotMaxTime={maxTime}
        stickyHeaderDates={false}
        navLinks
        navLinkDayClick={handleNavLinkDay}
        datesSet={handleDateChange}
        headerToolbar={{
          left: 'dayGridMonth timeGridWeek',
          center: 'title',
          right: 'today prev next',
        }}
        events={events}
      />
    </div>
  )
}
