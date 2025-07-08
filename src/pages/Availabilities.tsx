import { SearchForm } from '../components/forms/SearchForm'
import { AvailabilitiesTable } from '../components/tables/AvailabilitiesTable'
import { useAuth } from '../hooks/useAuth'
import { useAvailabilities } from '../hooks/useAvailabilities'

export function Availabilities() {
  const { authUser } = useAuth()
  const { availabilities, loading } = useAvailabilities({
    userId: authUser?.id,
    startTime: new Date('2024-01-01T00:00:00Z').toString(),
    endTime: Date.now().toString(),
  })
  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">Gestionar Especialistas</h1>
      <div className="flex justify-between items-center py-8">
        <SearchForm placeholder="Jane Doe" />
        <button
          className="bg-blue-500 text-white p-2 rounded-md  h-fit"
          type="button"
        >
          Agregar Horario
        </button>
      </div>
      <AvailabilitiesTable availabilities={availabilities} loading={loading} />
    </main>
  )
}
