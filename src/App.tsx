import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { AdminLayout } from './components/layouts/Admin'
import { AdminHome } from './pages/Admin'
import { Specialties } from './pages/Specialties'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="specialties" element={<Specialties />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
