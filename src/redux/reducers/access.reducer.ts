import {
  AccessState,
  AccessActionTypes,
  GET_LOG_OUT,
  ACCESS_RESET_PASSWORD,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_FINISHED,
  REDUX_ACCESS_GET_STORAGE_DATA,
  REDUX_ACCESS_CHECK_AUTHENTICATION,
  REDUX_ACCESS_GET_LOGIN
} from '../types'

const initialState: AccessState = {
  getLogOutError: null,
  resetPasswordVerifyCodeActived: null,
  resetPasswordToken: null,
  resetPasswordChangePasswordActived: null,
  resetPasswordFinishedActived: null,

  getStorageDataToken: null,
  getStorageDataUser: null,
  getStorageDataError: null,

  checkAuthenticationAuthenticated: null,
  checkAuthenticationError: null,

  getLoginError: null
}

export function accessReducer(
  state: AccessState = initialState,
  action: AccessActionTypes
): AccessState {
  switch (action.type) {
    case GET_LOG_OUT: {
      return {
        ...state,
        getStorageDataToken: null,
        getStorageDataUser: null
      }
    }
    case ACCESS_RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordVerifyCodeActived: true
      }
    }
    case ACCESS_RESET_PASSWORD_VERIFY_CODE: {
      return {
        ...state,
        resetPasswordChangePasswordActived: true,
        resetPasswordToken: action.payload
      }
    }
    case ACCESS_RESET_PASSWORD_CHANGE_PASSWORD: {
      return {
        ...state,
        resetPasswordFinishedActived: true
      }
    }
    case ACCESS_RESET_PASSWORD_FINISHED: {
      return {
        ...state,
        resetPasswordVerifyCodeActived: null,
        resetPasswordToken: null,
        resetPasswordChangePasswordActived: null,
        resetPasswordFinishedActived: null
      }
    }
    case REDUX_ACCESS_GET_STORAGE_DATA: {
      return {
        ...state,
        getStorageDataToken: action.payload.success?.token ?? null,
        getStorageDataUser: action.payload.success?.user ?? null,
        getStorageDataError: action.payload.failure ?? null
      }
    }
    case REDUX_ACCESS_CHECK_AUTHENTICATION: {
      return {
        ...state,
        checkAuthenticationAuthenticated:
          action.payload.success?.authenticated ?? null,
        checkAuthenticationError: action.payload.failure ?? null,
        getStorageDataToken: action.payload.failure
          ? null
          : state.getStorageDataToken,
        getStorageDataUser: action.payload.failure
          ? null
          : state.getStorageDataUser
      }
    }
    case REDUX_ACCESS_GET_LOGIN: {
      return {
        ...state,
        getStorageDataToken: action.payload.success?.token ?? null,
        getStorageDataUser: action.payload.success?.user ?? null,
        getLoginError: action.payload.failure
      }
    }
    default:
      return state
  }
}
