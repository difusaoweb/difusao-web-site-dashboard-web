import {
  AccessState,
  AccessActionTypes,
  GET_LOG_IN,
  GET_LOCAL_STORAGE,
  ACCESS_GET_IS_AUTHENTICATED,
  GET_LOG_OUT,
  ACCESS_RESET_PASSWORD,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_FINISHED,
  ACCESS_SIGN_UP,
  ACCESS_SIGN_UP_VERIFY_CODE,
  ACCESS_SIGN_UP_FINISHED
} from '../types'

const initialState: AccessState = {
  token: null,
  user: null,

  currentToken: null,
  isAuthenticated: null,
  getCurrentTokenError: null,
  getLogInError: null,
  getLogOutError: null,

  resetPasswordVerifyCodeActived: null,
  resetPasswordToken: null,
  resetPasswordChangePasswordActived: null,
  resetPasswordFinishedActived: null,

  signUpVerifyCodeActived: null,
  signUpFinishedActived: null
}

export function accessReducer(
  state: AccessState = initialState,
  action: AccessActionTypes
): AccessState {
  switch (action.type) {
    case GET_LOG_IN: {
      return {
        ...state,
        token: action.payload.success?.token ?? null,
        user: action.payload.success?.user ?? null
      }
    }
    case GET_LOCAL_STORAGE: {
      return {
        ...state,
        token: action.payload.success?.token ?? null,
        user: action.payload.success?.user ?? null
      }
    }
    case GET_LOG_OUT: {
      return {
        ...state,
        token: null,
        user: null
      }
    }

    case ACCESS_GET_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated ?? null,
        currentToken: action.payload?.isAuthenticated
          ? state.currentToken
          : null
      }
    }
    case ACCESS_SIGN_UP: {
      return {
        ...state,
        signUpVerifyCodeActived: true
      }
    }
    case ACCESS_SIGN_UP_VERIFY_CODE: {
      return {
        ...state,
        signUpFinishedActived: true
      }
    }
    case ACCESS_SIGN_UP_FINISHED: {
      return {
        ...state,
        signUpVerifyCodeActived: null,
        signUpFinishedActived: null
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
    default:
      return state
  }
}
