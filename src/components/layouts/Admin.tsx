import { SidebarLayout, type SidebarOption } from './Sidebar'
import { Outlet } from 'react-router'
import { FaStethoscope } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'

export function AdminLayout() {
  const navOptions: SidebarOption[] = [
    {
      icon: <FaStethoscope className="w-[14px] h-[14px]" />,
      label: 'Gestionar Especialidades',
      path: '/admin/specialties',
    },
    {
      icon: <FaUserDoctor className="w-[14px] h-[14px]" />,
      label: 'Gestionar Especialistas',
      path: '/admin/specialists',
    },
  ]

  return (
    <SidebarLayout options={navOptions}>
      <Outlet />
    </SidebarLayout>
  )
}
