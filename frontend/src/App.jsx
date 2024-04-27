import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

function App() {
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }
  function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/logout" element={
            <Logout />} />
          <Route path="/register" element={
            <RegisterAndLogout />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
