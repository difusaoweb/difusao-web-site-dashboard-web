import { AlertActionTypes, SET_ALERT, AlertState } from '../types'

const initialState: AlertState = {
  alert: null
}

export function alertsReducer(
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState {
  switch (action.type) {
    case SET_ALERT: {
      return {
        ...state,
        alert: action.payload
      }
    }
    default:
      return state
  }
}
