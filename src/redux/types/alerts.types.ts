export const SET_ALERT = 'SET_ALERT'

interface Alert {
  type: string
  message: string
}

export type SetAlertParametersReducer = Alert | null

interface SetAlertAction {
  type: typeof SET_ALERT
  payload: SetAlertParametersReducer
}

export interface AlertState {
  alert: SetAlertParametersReducer
}

export type AlertActionTypes = SetAlertAction
