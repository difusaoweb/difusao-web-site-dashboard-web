import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/404'
import { SignIn } from '../../pages/SignIn'

export const AccessRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
