import { ImSpinner8 } from 'react-icons/im'
import type { Specialist } from '../../types/specialist'
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { useSpecialtyCache } from '../../hooks/useSpecialtyCache'
import { FaXmark } from 'react-icons/fa6'

const COLUMNS = 6

interface Props {
  specialists?: Specialist[] | null
  loading?: boolean
  onEdit?: (specialist: Specialist) => void | Promise<void>
  onDelete?: (specialist: Specialist) => void | Promise<void>
}

export function SpecialistsTable({
  specialists,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const { getSpecialty } = useSpecialtyCache([
    ...new Set(specialists?.map((s) => s.specialtyId)),
  ])

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre completo</th>
          <th>Email</th>
          <th>Titulo</th>
          <th>Especialidad</th>
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
        ) : specialists?.length ? (
          specialists.map((specialist) => (
            <tr key={specialist.id}>
              <td>{specialist.fullName}</td>
              <td>{specialist.email}</td>
              <td>{specialist.title}</td>
              <td>
                {getSpecialty(specialist.specialtyId)?.name ?? (
                  <ImSpinner8 className="animate-spin" />
                )}
              </td>
              <td>
                {specialist.isActive ? (
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
                    onClick={() => onEdit?.(specialist)}
                  >
                    <FaEdit className="text-white w-[12px] h-[12px]" />
                  </button>
                  <button
                    className="p-2 bg-red-500 rounded-md"
                    type="button"
                    onClick={() => onDelete?.(specialist)}
                    disabled={!specialist.isActive}
                  >
                    <FaTrash className="text-white w-[12px] h-[12px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={COLUMNS}>No hay especialistas registrados</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
