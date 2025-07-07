import { MdOutlineError, MdOutlineInfo, MdOutlineWarning } from 'react-icons/md'

export type ModalIconType = 'info' | 'error' | 'danger'

interface ModalIconProps {
  icon: ModalIconType
}

export function ModalIcon({ icon }: ModalIconProps) {
  const baseClass = 'min-w-[28px] min-h-[28px]'
  const icons: Record<ModalIconType, React.ReactElement> = {
    info: <MdOutlineInfo className={`${baseClass} text-gray-500`} />,
    error: <MdOutlineError className={`${baseClass} text-red-500`} />,
    danger: <MdOutlineWarning className={`${baseClass} text-yellow-500`} />,
  }
  return icons[icon] ?? icons.info
}
