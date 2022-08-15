export interface GetLogInParametersService {
  email: string
  password: string
}
export interface GetLogInParametersReducer {
  token: string
  user: {
    id: number
    displayName: string
  }
}
export interface GetLogOutReturnServiceInterface {
  revoked: boolean
}

export interface AccessSignUpParameters {
  userLogin: string
  userPass: string
  userEmail: string
  displayName: string
}
export interface PostSignUpReturnServiceInterface {
  created: boolean
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

export interface AccessActionIsAuthenticatedParameters {
  isAuthenticated: boolean
}

export const GET_LOG_IN = 'GET_LOG_IN'
export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE'
export const GET_LOG_OUT = 'GET_LOG_OUT'

export const ACCESS_GET_IS_AUTHENTICATED = 'ACCESS_GET_IS_AUTHENTICATED'
export const ACCESS_RESET_PASSWORD = 'ACCESS_RESET_PASSWORD'
export const ACCESS_RESET_PASSWORD_VERIFY_CODE =
  'ACCESS_RESET_PASSWORD_VERIFY_CODE'
export const ACCESS_RESET_PASSWORD_CHANGE_PASSWORD =
  'ACCESS_RESET_PASSWORD_CHANGE_PASSWORD'
export const ACCESS_RESET_PASSWORD_FINISHED = 'ACCESS_RESET_PASSWORD_FINISHED'
export const ACCESS_SIGN_UP = 'ACCESS_SIGN_UP'
export const ACCESS_SIGN_UP_VERIFY_CODE = 'ACCESS_SIGN_UP_VERIFY_CODE'
export const ACCESS_SIGN_UP_FINISHED = 'ACCESS_SIGN_UP_FINISHED'

interface GetLogInAction {
  type: typeof GET_LOG_IN
  payload: {
    success: GetLogInParametersReducer | null
    failure: boolean | null
  }
}
interface GetLocalStorageAction {
  type: typeof GET_LOCAL_STORAGE
  payload: {
    success: GetLogInParametersReducer | null
    failure: boolean | null
  }
}
interface GetLogOutAction {
  type: typeof GET_LOG_OUT
  payload: {
    success: boolean | null
    failure: boolean | null
  }
}

interface AccessActionGetIsAuthenticated {
  type: typeof ACCESS_GET_IS_AUTHENTICATED
  payload: AccessActionIsAuthenticatedParameters | null
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

interface AccessActionSignUp {
  type: typeof ACCESS_SIGN_UP
}

interface AccessActionSignUpVerifyCode {
  type: typeof ACCESS_SIGN_UP_VERIFY_CODE
}

interface AccessActionSignUpFinished {
  type: typeof ACCESS_SIGN_UP_FINISHED
}

export interface AccessState {
  token: string | null
  user: {
    id: number
    displayName: string
  } | null

  currentToken: string | null
  isAuthenticated: boolean | null
  getCurrentTokenError: boolean | null
  getLogInError: boolean | null
  getLogOutError: boolean | null

  resetPasswordVerifyCodeActived: boolean | null
  resetPasswordChangePasswordActived: boolean | null
  resetPasswordFinishedActived: boolean | null
  resetPasswordToken: string | null

  signUpVerifyCodeActived: boolean | null
  signUpFinishedActived: boolean | null
}

export type AccessActionTypes =
  | GetLogInAction
  | GetLocalStorageAction
  | GetLogOutAction
  | AccessActionGetIsAuthenticated
  | AccessResetPassword
  | AccessResetPasswordVerifyCode
  | AccessResetPasswordChangePassword
  | AccessResetPasswordFinished
  | AccessActionSignUp
  | AccessActionSignUpVerifyCode
  | AccessActionSignUpFinished
