import * as React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { AccessRoutes } from './Access/index.routes'
import { AppRoutes } from './App/index.routes'
import { RootState, getLocalStorage } from '../redux'
import { Alert } from '../components/atoms/Alert'

export const Routes = () => {
  const { token } = useSelector((state: ReturnType<RootState>) => state.access)
  const dispatch = useDispatch()

  const [loadingGetLocalStorage, setLoadingGetLocalStorage] =
    React.useState(false)

  React.useEffect(() => {
    async function onGetLocalStorage() {
      if (loadingGetLocalStorage) {
        return
      }
      setLoadingGetLocalStorage(true)
      await dispatch(getLocalStorage())
      setLoadingGetLocalStorage(false)
    }
    onGetLocalStorage()
  }, [])

  if (loadingGetLocalStorage) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {token ? <AppRoutes /> : <AccessRoutes />}
      <Alert />
    </>
  )
}
