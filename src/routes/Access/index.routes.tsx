import * as React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import { Login } from '../../pages/Login'
import { useAppSelector } from '../../redux'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { checkAuthenticationAuthenticated } = useAppSelector(
    state => state.access
  )
  const location = useLocation()

  if (!checkAuthenticationAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
const RequireNotAuth = ({ children }: { children: JSX.Element }) => {
  const { checkAuthenticationAuthenticated } = useAppSelector(
    state => state.access
  )
  const location = useLocation()

  if (checkAuthenticationAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
export const AccessRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireNotAuth>
            <Login />
          </RequireNotAuth>
        }
      />
    </Routes>
  )
}
