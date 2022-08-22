import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/404'
import { Dashboard } from '../../pages/Dashboard'
import { ServiceListPage } from '../../pages/ServiceList'
import { ServiceAddPage } from '../../pages/ServiceAdd'
import { CaseListPage } from '../../pages/CaseList'
import { CaseAddPage } from '../../pages/CaseAdd'
import { AttachmentListPage } from '../../pages/AttachmentList'
import { AttachmentAddPage } from '../../pages/AttachmentAdd'
import { UsersList } from '../../pages/UsersList'
import { UsersAdd } from '../../pages/UsersAdd'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/servicos/" element={<ServiceListPage />} />
      <Route path="/servicos/adicionar/" element={<ServiceAddPage />} />
      <Route path="/cases/" element={<CaseListPage />} />
      <Route path="/cases/adicionar/" element={<CaseAddPage />} />
      <Route path="/midias/" element={<AttachmentListPage />} />
      <Route path="/midias/adicionar/" element={<AttachmentAddPage />} />
      <Route path="/usuarios/" element={<UsersList />} />
      <Route path="/usuarios/adicionar/" element={<UsersAdd />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
