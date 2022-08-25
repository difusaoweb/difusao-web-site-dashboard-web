import * as React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import { useAppSelector } from '../../redux'
import { Dashboard } from '../../pages/Dashboard'
import { ServiceListPage } from '../../pages/ServiceList'
import { ServiceAddPage } from '../../pages/ServiceAdd'
import { CaseListPage } from '../../pages/CaseList'
import { CaseAddPage } from '../../pages/CaseAdd'
import { AttachmentListPage } from '../../pages/AttachmentList'
import { AttachmentAddPage } from '../../pages/AttachmentAdd'
import { UsersList } from '../../pages/UsersList'
import { UsersAdd } from '../../pages/UsersAdd'

export const AppRoutes = () => {
  const { checkAuthenticationAuthenticated } = useAppSelector(
    state => state.access
  )
  const location = useLocation()

  if (!checkAuthenticationAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/servicos" element={<ServiceListPage />} />
      <Route path="/servicos/adicionar" element={<ServiceAddPage />} />
      <Route path="/cases" element={<CaseListPage />} />
      <Route path="/cases/adicionar" element={<CaseAddPage />} />
      <Route path="/midias" element={<AttachmentListPage />} />
      <Route path="/midias/adicionar" element={<AttachmentAddPage />} />
      <Route path="/usuarios" element={<UsersList />} />
      <Route path="/usuarios/adicionar" element={<UsersAdd />} />
    </Routes>
  )
}
