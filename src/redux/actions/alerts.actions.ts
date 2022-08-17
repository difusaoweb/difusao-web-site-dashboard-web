import { ActionCreator, Dispatch } from 'redux'

import {
  AlertActionTypes,
  SET_ALERT,
  SetAlertParametersReducer
} from '../types'

const setAlertAction: ActionCreator<AlertActionTypes> = (
  payload: SetAlertParametersReducer
) => {
  return { type: SET_ALERT, payload }
}
export const setAlert = (alert: SetAlertParametersReducer) => {
  return async (dispatch: Dispatch<AlertActionTypes>) => {
    dispatch(setAlertAction(alert))
  }
}
