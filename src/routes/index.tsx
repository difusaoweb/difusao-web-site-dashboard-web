import * as React from 'react'

import { AccessRoutes } from './Access/index.routes'
import { AppRoutes } from './App/index.routes'
import {
  useAppDispatch,
  useAppSelector,
  reduxAccessGetStorageDataFunction,
  reduxAccessCheckAuthenticationFunction
} from '../redux'
import { Alert } from '../components/atoms/Alert'
import { Loading } from '../components/atoms/Loading'

export const Routes = () => {
  const dispatch = useAppDispatch()
  const { getStorageDataToken, checkAuthenticationAuthenticated } =
    useAppSelector(state => state.access)

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

  // React.useEffect(() => {
  //   if (getStorageDataToken) {
  //     onReduxAccessCheckAuthenticationFunction()
  //   }
  // }, [getStorageDataToken])

  console.log('getStorageDataToken')
  console.log(getStorageDataToken)

  if (isLoadingGetStorageData || isLoadingCheckAuthentication)
    return <Loading />

  return (
    <>
      {checkAuthenticationAuthenticated ? <AppRoutes /> : <AccessRoutes />}
      <Alert />
    </>
  )
}
