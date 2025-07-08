import { Route, Routes } from 'react-router'
import './App.css'
import {
  AdminHome,
  Availabilities,
  Login,
  NotFound,
  Register,
  SpecialistHome,
  Specialists,
  Specialties,
} from './pages'
import { AdminLayout, SpecialistLayout } from './components/layouts'
import { AuthProvider, ProtectedRoute } from './components/auth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="specialties" element={<Specialties />} />
            <Route path="specialists" element={<Specialists />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ESPECIALISTA']} />}>
          <Route path="/specialist" element={<SpecialistLayout />}>
            <Route index element={<SpecialistHome />} />
            <Route path="availabilities" element={<Availabilities />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
