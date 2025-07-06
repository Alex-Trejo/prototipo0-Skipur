import type { ReactElement } from 'react'
import { MdOutlineError, MdOutlineInfo, MdOutlineWarning } from 'react-icons/md'
import { Modal } from './Modal'
import type { MessageModalType } from '../../hooks/useMessageModal'

function MessageModalIcon({ type }: { type: MessageModalType }) {
  const baseClass = 'min-w-[28px] min-h-[28px]'
  const icons: Record<MessageModalType, ReactElement> = {
    info: <MdOutlineInfo className={`${baseClass} text-gray-400`} />,
    error: <MdOutlineError className={`${baseClass} text-red-400`} />,
    warn: <MdOutlineWarning className={`${baseClass} text-yellow-400`} />,
  }
  return icons[type] ?? icons.info
}

interface Props {
  title: string
  message: string
  type?: MessageModalType
  open?: boolean
  onAccept?: () => void
  onClose?: () => void
}

export function MessageModal({
  title,
  message,
  type = 'info',
  open = false,
  onAccept,
}: Props) {
  return (
    <Modal open={open} onClose={onAccept}>
      <aside className="bg-white p-6 rounded-md border border-gray-300 flex flex-col gap-y-4 w-fit max-w-[360px]">
        <h6 className="font-semibold text-2xl">{title}</h6>
        <div className="flex justify-between items-center gap-x-6">
          <MessageModalIcon type={type} />
          <p>{message}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 rounded-md p-2 min-w-[84px] text-white"
            type="button"
            onClick={onAccept}
          >
            Aceptar
          </button>
        </div>
      </aside>
    </Modal>
  )
}
