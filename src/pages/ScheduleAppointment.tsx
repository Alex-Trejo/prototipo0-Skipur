import { SpecialistSelect } from '../components/selects/SpecialistSelect'

export function ScheduleAppointment() {
  return (
    <main className="p-8 h-dvh">
      <h1 className="text-4xl font-semibold">Agendar cita</h1>
      <SpecialistSelect />
      <div className="flex items-center justify-end gap-x-4 py-8"></div>
    </main>
  )
}
