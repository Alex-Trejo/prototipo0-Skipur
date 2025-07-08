import { ImSpinner8 } from 'react-icons/im'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import type { Availability } from '../../types/availability'

const COLUMNS = 4

interface Props {
  availabilities?: Availability[] | null
  loading?: boolean
  onEdit?: (availability: Availability) => void | Promise<void>
}

export function AvailabilitiesTable({
  availabilities,
  loading,
  onEdit,
}: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fecha inicio</th>
          <th>Fecha fin</th>
          <th>Disponible</th>
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
        ) : availabilities?.length ? (
          availabilities.map((availability) => (
            <tr key={availability.id}>
              <td>
                {availability.startTime.toLocaleDateString()}{' '}
                {availability.startTime.toLocaleTimeString()}
              </td>
              <td>
                {availability.endTime.toLocaleDateString()}{' '}
                {availability.endTime.toLocaleTimeString()}
              </td>
              <td>
                {availability.isBooked ? (
                  <FaXmark className="text-red-500" />
                ) : (
                  <FaCheck className="text-green-500" />
                )}
              </td>
              <td>
                <div className="flex gap-x-3 items-center">
                  <button
                    className="p-2 bg-yellow-500 rounded-md"
                    type="button"
                    onClick={() => onEdit?.(availability)}
                  >
                    <FaEdit className="text-white w-[12px] h-[12px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={COLUMNS}>No hay horarios registrados</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
