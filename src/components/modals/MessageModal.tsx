import { useMemo } from 'react'
import { Modal } from './Modal'
import { ModalButton, type ModalButtonProps } from './ModalButton'
import { ModalIcon, type ModalIconType } from './ModalIcon'

interface Props {
  title: string
  message: string
  icon?: ModalIconType
  open?: boolean
  buttons?: ModalButtonProps[]
  disabledClose?: boolean
  onClose?: () => void
}

export function MessageModal({
  title,
  message,
  icon = 'info',
  open = false,
  buttons,
  disabledClose,
  onClose,
}: Props) {
  const modalButtons = useMemo<ModalButtonProps[]>(() => {
    if (buttons?.length) return buttons

    return [
      {
        label: 'Cerrar',
        style: 'primary',
        onClick: onClose,
      },
    ]
  }, [buttons, onClose])

  return (
    <Modal open={open} disabledClose={disabledClose} onClose={onClose}>
      <aside className="bg-white p-6 rounded-md border border-gray-300 flex flex-col gap-y-4 w-fit max-w-[360px]">
        <h6 className="font-semibold text-2xl">{title}</h6>

        <div className="flex justify-between items-center gap-x-6">
          <ModalIcon icon={icon} />
          <p>{message}</p>
        </div>

        <div className="flex justify-center gap-x-10">
          {modalButtons.map(({ label, style, onClick }, index) => (
            <ModalButton
              key={`${label}-${index}`}
              label={label}
              style={style}
              onClick={onClick}
            />
          ))}
        </div>
      </aside>
    </Modal>
  )
}
