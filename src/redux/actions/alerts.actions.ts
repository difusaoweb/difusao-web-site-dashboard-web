import { Dispatch } from 'redux'

import {
  AlertActionTypes,
  SET_ALERT,
  SetAlertParametersReducer
} from '../types'

export function reduxAlertsSetAlertFunction(
  reducer: SetAlertParametersReducer
) {
  return async (dispatch: Dispatch<AlertActionTypes>) => {
    dispatch({ type: SET_ALERT, payload: reducer })
  }
}
