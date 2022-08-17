import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/404'
import { Login } from '../../pages/Login'

export const AccessRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
