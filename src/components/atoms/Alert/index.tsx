import * as React from 'react'
import { Snackbar, Alert as AlertMui } from '@mui/material'

import {
  useAppDispatch,
  useAppSelector,
  reduxAlertsSetAlertFunction
} from '../../../redux'

export const Alert: React.FC = () => {
  const { alert } = useAppSelector(state => state.alerts)
  const dispatch = useAppDispatch()

  const [openAlertNotification, setOpenAlertNotification] =
    React.useState(false)

  async function onDismiss() {
    await dispatch(reduxAlertsSetAlertFunction(null))
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
