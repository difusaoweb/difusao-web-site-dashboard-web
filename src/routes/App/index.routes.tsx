import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/404'
import { Dashboard } from '../../pages/Dashboard'
import { ServiceListPage } from '../../pages/ServiceList'
import { ServiceAddPage } from '../../pages/ServiceAdd'
import { UsersList } from '../../pages/UsersList'
import { UsersAdd } from '../../pages/UsersAdd'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/servicos/" element={<ServiceListPage />} />
      <Route path="/servicos/adicionar/" element={<ServiceAddPage />} />
      <Route path="/usuarios/" element={<UsersList />} />
      <Route path="/usuarios/adicionar/" element={<UsersAdd />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
