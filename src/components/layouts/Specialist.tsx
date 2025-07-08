import { RiCalendarScheduleFill } from 'react-icons/ri'
import { SidebarLayout, type SidebarOption } from './Sidebar'
import { Outlet } from 'react-router'

export function SpecialistLayout() {
  const navOptions: SidebarOption[] = [
    {
      icon: <RiCalendarScheduleFill className="w-[14px] h-[14px]" />,
      label: 'Gestionar Disponibilidad',
      path: '/specialist/availabilities',
    },
  ]

  return (
    <SidebarLayout options={navOptions}>
      <Outlet />
    </SidebarLayout>
  )
}
