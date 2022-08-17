import { ReturnErrorInterface, ErrorStatus } from './common.types'

export interface GetLogOutReturnServiceInterface {
  revoked: boolean
}
export interface AccessResetPasswordParameters {
  userLogin: string
}
export interface AccessResetPasswordVerifyCodeParameters {
  token: string
}
export interface AccessResetPasswordChangePasswordParameters {
  password: string
}
export interface AccessServiceResetPasswordChangePasswordParameters {
  token: string
  password: string
}

export interface ReduxAccessGetStorageDataUser {
  id: number
  name: string
}
export interface ReduxAccessGetStorageDataReducerPayload {
  success: {
    user: ReduxAccessGetStorageDataUser
    token: string
  } | null
  failure: ErrorStatus | null
}

export interface ReduxAccessCheckAuthenticationReducerPayload {
  success: { authenticated: boolean } | null
  failure: ErrorStatus | null
}

export interface ReduxAccessGetLoginServiceParameters {
  email: string
  password: string
}
export interface ReduxAccessGetLoginReducerPayload {
  success: {
    token: string
    user: ReduxAccessGetStorageDataUser
  } | null
  failure: ErrorStatus | null
}

export const GET_LOG_OUT = 'GET_LOG_OUT'
export const ACCESS_RESET_PASSWORD = 'ACCESS_RESET_PASSWORD'
export const ACCESS_RESET_PASSWORD_VERIFY_CODE =
  'ACCESS_RESET_PASSWORD_VERIFY_CODE'
export const ACCESS_RESET_PASSWORD_CHANGE_PASSWORD =
  'ACCESS_RESET_PASSWORD_CHANGE_PASSWORD'
export const ACCESS_RESET_PASSWORD_FINISHED = 'ACCESS_RESET_PASSWORD_FINISHED'

interface GetLogOutAction {
  type: typeof GET_LOG_OUT
  payload: {
    success: boolean | null
    failure: boolean | null
  }
}
interface AccessResetPassword {
  type: typeof ACCESS_RESET_PASSWORD
  payload: boolean | null
}

interface AccessResetPasswordVerifyCode {
  type: typeof ACCESS_RESET_PASSWORD_VERIFY_CODE
  payload: string | null
}

interface AccessResetPasswordChangePassword {
  type: typeof ACCESS_RESET_PASSWORD_CHANGE_PASSWORD
  payload: boolean | null
}

interface AccessResetPasswordFinished {
  type: typeof ACCESS_RESET_PASSWORD_FINISHED
}

export const REDUX_ACCESS_GET_STORAGE_DATA = 'REDUX_ACCESS_GET_STORAGE_DATA'
interface ReduxAccessGetStorageDataReducer {
  type: typeof REDUX_ACCESS_GET_STORAGE_DATA
  payload: ReduxAccessGetStorageDataReducerPayload
}

export const REDUX_ACCESS_CHECK_AUTHENTICATION =
  'REDUX_ACCESS_CHECK_AUTHENTICATION'
interface ReduxAccessCheckAuthenticationReducer {
  type: typeof REDUX_ACCESS_CHECK_AUTHENTICATION
  payload: ReduxAccessCheckAuthenticationReducerPayload
}

export const REDUX_ACCESS_GET_LOGIN = 'REDUX_ACCESS_GET_LOGIN'
interface ReduxAccessGetLoginReducer {
  type: typeof REDUX_ACCESS_GET_LOGIN
  payload: ReduxAccessGetLoginReducerPayload
}

export interface AccessState {
  getLogOutError: boolean | null
  resetPasswordVerifyCodeActived: boolean | null
  resetPasswordChangePasswordActived: boolean | null
  resetPasswordFinishedActived: boolean | null
  resetPasswordToken: string | null

  getStorageDataToken: string | null
  getStorageDataUser: ReduxAccessGetStorageDataUser | null
  getStorageDataError: ErrorStatus | null

  checkAuthenticationAuthenticated: boolean | null
  checkAuthenticationError: ErrorStatus | null

  getLoginError: ErrorStatus | null
}

export type AccessActionTypes =
  | GetLogOutAction
  | AccessResetPassword
  | AccessResetPasswordVerifyCode
  | AccessResetPasswordChangePassword
  | AccessResetPasswordFinished
  | ReduxAccessGetStorageDataReducer
  | ReduxAccessCheckAuthenticationReducer
  | ReduxAccessGetLoginReducer
