import {
  FaCheck,
  FaCheckCircle,
  FaEdit,
  FaStethoscope,
  FaTrash,
} from 'react-icons/fa'
import { FaUserDoctor, FaXmark } from 'react-icons/fa6'
import { ImSpinner8 } from 'react-icons/im'
import {
  MdLogout,
  MdOutlineError,
  MdOutlineInfo,
  MdOutlineQuestionMark,
  MdOutlineWarning,
} from 'react-icons/md'
import { RiCalendarScheduleFill } from 'react-icons/ri'
import { AiOutlineSchedule } from 'react-icons/ai'

const ICONS = {
  loading: ImSpinner8,
  close: FaXmark,
  estethoscope: FaStethoscope,
  doctor: FaUserDoctor,
  logout: MdLogout,
  schedule: RiCalendarScheduleFill,
  info: MdOutlineInfo,
  error: MdOutlineError,
  danger: MdOutlineWarning,
  question: MdOutlineQuestionMark,
  valid: FaCheck,
  invalid: FaXmark,
  edit: FaEdit,
  trash: FaTrash,
  success: FaCheckCircle,
  calendarCheck: AiOutlineSchedule,
}

type IconName = keyof typeof ICONS

interface Props {
  name: IconName
  color?: string
  className?: string
}

export function IconFactory({ name, color, className }: Props) {
  const IconComponent = ICONS[name]

  if (!IconComponent) return null

  return <IconComponent color={color} className={className} />
}
