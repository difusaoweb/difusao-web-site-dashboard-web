import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert as AlertMui } from '@mui/material'

import { setAlert, RootState } from '../../../redux'

export const Alert: React.FC = () => {
  const { alert } = useSelector((state: ReturnType<RootState>) => state.alerts)
  const dispatch = useDispatch()

  const [openAlertNotification, setOpenAlertNotification] =
    React.useState(false)

  async function onDismiss() {
    await dispatch(setAlert(null))
    setOpenAlertNotification(false)
  }

  React.useEffect(() => {
    if (alert) {
      setOpenAlertNotification(true)
    }
  }, [alert])

  if (alert) {
    return (
      <Snackbar open={openAlertNotification} autoHideDuration={500}>
        <AlertMui
          onClose={onDismiss}
          severity={alert.type}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </AlertMui>
      </Snackbar>
    )
  }

  return <></>
}
