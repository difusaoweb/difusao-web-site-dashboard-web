import * as React from 'react'
import {
  Route,
  Routes as TheRoutes,
  useLocation,
  Navigate
} from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
  reduxAccessGetStorageDataFunction,
  reduxAccessCheckAuthenticationFunction
} from '../redux'
import { Alert } from '../components/atoms/Alert'
import { Loading } from '../components/atoms/Loading'

import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { ServiceListPage } from '../pages/ServiceList'
import { ServiceAddPage } from '../pages/ServiceAdd'
import { CaseListPage } from '../pages/CaseList'
import { CaseAddPage } from '../pages/CaseAdd'
import { AttachmentListPage } from '../pages/AttachmentList'
import { AttachmentAddPage } from '../pages/AttachmentAdd'
import { UserListPage } from '../pages/UserList'
import { UsersAdd } from '../pages/UsersAdd'
import { NotFound } from '../pages/404'

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

export const Routes = () => {
  const { getStorageDataToken, checkAuthenticationAuthenticated } =
    useAppSelector(state => state.access)
  const dispatch = useAppDispatch()

  const [isLoadingGetStorageData, setIsLoadingGetStorageData] =
    React.useState(true)
  const [isLoadingCheckAuthentication, setIsLoadingCheckAuthentication] =
    React.useState(false)

  async function onReduxAccessGetStorageDataFunction() {
    await dispatch(reduxAccessGetStorageDataFunction())
    setIsLoadingGetStorageData(false)
  }

  async function onReduxAccessCheckAuthenticationFunction() {
    setIsLoadingCheckAuthentication(true)
    await dispatch(reduxAccessCheckAuthenticationFunction())
    setIsLoadingCheckAuthentication(false)
  }

  React.useEffect(() => {
    onReduxAccessGetStorageDataFunction()
  }, [])

  React.useEffect(() => {
    if (getStorageDataToken) {
      onReduxAccessCheckAuthenticationFunction()
    }
  }, [getStorageDataToken])

  if (isLoadingGetStorageData || isLoadingCheckAuthentication)
    return <Loading />

  return (
    <>
      <TheRoutes>
        <Route
          path="/"
          element={checkAuthenticationAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/servicos"
          element={
            <RequireAuth>
              <ServiceListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/servicos/adicionar"
          element={
            <RequireAuth>
              <ServiceAddPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cases"
          element={
            <RequireAuth>
              <CaseListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cases/adicionar"
          element={
            <RequireAuth>
              <CaseAddPage />
            </RequireAuth>
          }
        />
        <Route
          path="/midias"
          element={
            <RequireAuth>
              <AttachmentListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/midias/adicionar"
          element={
            <RequireAuth>
              <AttachmentAddPage />
            </RequireAuth>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RequireAuth>
              <UserListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/usuarios/adicionar"
          element={
            <RequireAuth>
              <UsersAdd />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <NotFound />
            </RequireAuth>
          }
        />
      </TheRoutes>
      <Alert />
    </>
  )
}
