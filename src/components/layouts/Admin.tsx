import { SidebarLayout } from './Sidebar'
import { Outlet } from 'react-router'
import { FaStethoscope } from 'react-icons/fa'

export function AdminLayout() {
  const navOptions = [
    {
      icon: <FaStethoscope className="w-[14px] h-[14px]" />,
      label: 'Gestionar Especialidades',
      path: '/admin/specialties',
    },
  ]

  return (
    <SidebarLayout options={navOptions}>
      <Outlet />
    </SidebarLayout>
  )
}
