import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/404'
import { Dashboard } from '../../pages/Dashboard'
import { ProductsList } from '../../pages/ProductsList'
import { ProductsAdd } from '../../pages/ProductsAdd'
import { UsersList } from '../../pages/UsersList'
import { UsersAdd } from '../../pages/UsersAdd'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/produtos/" element={<ProductsList />} />
      <Route path="/produtos/adicionar/" element={<ProductsAdd />} />
      <Route path="/usuarios/" element={<UsersList />} />
      <Route path="/usuarios/adicionar/" element={<UsersAdd />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
