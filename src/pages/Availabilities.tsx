import { SearchForm } from '../components/forms/SearchForm'

export function Availabilities() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">Gestionar Especialistas</h1>
      <div className="flex justify-between items-center py-8">
        <SearchForm placeholder="Jane Doe" />
        <button
          className="bg-blue-500 text-white p-2 rounded-md  h-fit"
          type="button"
        >
          Agregar Disponibilidad
        </button>
      </div>
    </main>
  )
}
