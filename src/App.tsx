import { Route, Routes } from 'react-router'
import './App.css'
import { AdminLayout } from './components/layouts/Admin'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import {
  AdminHome,
  Login,
  NotFound,
  Register,
  Specialists,
  Specialties,
} from './pages'
import { AuthProvider } from './components/auth/AuthProvider'

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
