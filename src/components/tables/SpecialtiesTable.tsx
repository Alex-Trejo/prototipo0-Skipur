import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import type { Specialty } from '../../types/specialty'
import { ImSpinner8 } from 'react-icons/im'
import { FaXmark } from 'react-icons/fa6'

interface Props {
  specialties?: Specialty[] | null
  loading?: boolean
  onEdit?: (specialty: Specialty) => void | Promise<void>
  onDelete?: (specialty: Specialty) => void | Promise<void>
}

const COLUMNS = 4

export function SpecialtiesTable({
  specialties,
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre de la especialidad</th>
          <th>Descripción</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={COLUMNS}>
              <span className="inline-flex items-center gap-x-2">
                <ImSpinner8 className="animate-spin" /> Cargando
              </span>
            </td>
          </tr>
        ) : specialties?.length ? (
          specialties.map((specialty) => (
            <tr key={specialty.id}>
              <td>{specialty.name}</td>
              <td>{specialty.description}</td>
              <td>
                {specialty.isActive ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaXmark className="text-red-500" />
                )}
              </td>
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
                    onClick={() => onDelete?.(specialty)}
                  >
                    <FaTrash className="text-white w-[12px] h-[12px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={COLUMNS}>No hay especialidades registradas</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
