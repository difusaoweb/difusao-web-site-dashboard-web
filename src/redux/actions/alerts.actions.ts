import { ActionCreator } from 'redux'

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
  return dispatch => {
    dispatch(setAlertAction(alert))
  }
}
