import type { ReactElement } from 'react'
import { MdOutlineError, MdOutlineInfo, MdOutlineWarning } from 'react-icons/md'

type MessageModalType = 'info' | 'error' | 'warn'

function MessageModalIcon({ type }: { type: MessageModalType }) {
  const baseClass = 'min-w-[28px] min-h-[28px]'
  const icons: Record<MessageModalType, ReactElement> = {
    info: <MdOutlineInfo className={`${baseClass} text-gray-400`} />,
    error: <MdOutlineError className={`${baseClass} text-red-400`} />,
    warn: <MdOutlineWarning className={`${baseClass} text-yellow-400`} />,
  }
  return icons[type] ?? icons.info
}

export interface MessageModalData {
  title: string
  message: string
  type?: MessageModalType
  open?: boolean
}

interface Props extends MessageModalData {
  onAccept?: () => void
}

export function MessageModal({
  message,
  title,
  type = 'info',
  open = false,
  onAccept,
}: Props) {
  if (!open) return null

  return (
    <dialog className="fixed w-dvw h-dvh inset-0 z-50 backdrop-blur-xs flex items-center justify-center bg-black/30 p-20">
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
    </dialog>
  )
}
