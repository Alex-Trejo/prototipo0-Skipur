import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import Logo from '../../assets/images/logo.png'
import { FaStethoscope } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useCallback } from 'react'
import { logout } from '../../services/auth.service'

export function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const closeSession = () => {
    logout()
    navigate('/', { replace: true })
  }

  const isActiveOption = useCallback(
    (option: string) => location.pathname.includes(option),
    [location]
  )

  return (
    <div className="min-h-dvh grid grid-cols-[minmax(auto,_280px)_1fr]">
      <header className="bg-slate-700 text-white relative">
        <nav className="p-5 sticky top-0 min-h-dvh flex flex-col justify-between">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <img
                className="max-w-[120px] mx-auto bg-white rounded-full p-3"
                src={Logo}
                alt="Logotipo de la Fundación Carlitos"
              />
              <p className="font-semibold text-2xl text-center">
                Fundación Carlitos
              </p>
            </div>
            <ul className="flex flex-col gap-y-2">
              <li>
                <Link
                  className={`rounded-md py-3 px-5 flex items-center gap-x-2 ${isActiveOption('specialties') ? 'bg-blue-400 hover:cursor-default' : 'hover:bg-gray-500'}`}
                  to={'/admin/specialties'}
                >
                  <FaStethoscope className="w-[14px] h-[14px]" />
                  Gestionar Especialidades
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="rounded-md hover:bg-red-500  py-3 px-5 flex items-center gap-x-2"
            type="button"
            onClick={closeSession}
          >
            <MdLogout className="w-[16px] h-[16px]" />
            Cerrar Sesión
          </button>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
