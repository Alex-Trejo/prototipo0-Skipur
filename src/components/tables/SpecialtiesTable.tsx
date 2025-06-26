import { FaEdit, FaTrash } from 'react-icons/fa'
import type { Specialty } from '../../types/specialty'

interface Props {
  specialties?: Specialty[] | null
  onEdit?: (specialty: Specialty) => void | Promise<void>
  onDelete?: (id: string) => void | Promise<void>
}

export function SpecialtiesTable({ specialties, onEdit, onDelete }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre de la especialidad</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {specialties?.length ? (
          specialties.map((specialty) => (
            <tr key={specialty.id}>
              <td>{specialty.name}</td>
              <td>{specialty.description}</td>
              <td>
                <div className="flex gap-x-3 items-center">
                  <button
                    className="p-2 bg-yellow-500 rounded-md"
                    type="button"
                    onClick={() => onEdit?.(specialty)}
                  >
                    <FaEdit className="text-white w-[12px] h-[12px]" />
                  </button>
                  <button
                    className="p-2 bg-red-500 rounded-md"
                    type="button"
                    onClick={() => onDelete?.(specialty.id!)}
                  >
                    <FaTrash className="text-white w-[12px] h-[12px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No hay especialidades registradas</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
