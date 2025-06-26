import { useState } from 'react'
import type { Specialty } from '../../types/specialty'
import { SpecialtyForm, type FormData } from '../forms/SpecialtyForm'
import { HiOutlineX } from 'react-icons/hi'

export interface ModalData extends FormData {
  open?: boolean
}

interface Props extends ModalData {
  onSubmit?: (specialty: Specialty) => void | Promise<void>
  onError?: () => void
  onClose?: () => void
}

export function SpecialtyModal({
  open = false,
  mode = 'add',
  initialValues,
  onSubmit,
  onError,
  onClose,
}: Props) {
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = async (specialty: Specialty) => {
    setSubmitting(true)
    await onSubmit?.(specialty)
    setSubmitting(false)
  }

  const handleError = () => {
    setSubmitting(false)
    onError?.()
  }

  if (!open) return null

  return (
    <dialog className="fixed w-dvw h-dvh inset-0 z-50 backdrop-blur-xs flex items-center justify-center bg-black/30 p-20">
      <aside className="bg-white p-6 rounded-md border border-gray-300 flex flex-col gap-y-4 min-w-[50%] relative">
        <button
          className="absolute right-0 top-0 m-2"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <HiOutlineX className=" text-red-500 w-[20px] h-[20px]" />
        </button>
        <SpecialtyForm
          onSubmit={handleSubmit}
          onError={handleError}
          mode={mode}
          initialValues={initialValues}
        />
      </aside>
    </dialog>
  )
}
