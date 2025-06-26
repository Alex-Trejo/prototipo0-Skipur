import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
