import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  AccessActionTypes,
  GET_LOG_IN,
  GetLogInParametersService,
  GetLogInParametersReducer,
  GET_LOCAL_STORAGE,
  ACCESS_SIGN_UP,
  AccessSignUpParameters,
  GET_LOG_OUT,
  AccessResetPasswordParameters,
  ACCESS_RESET_PASSWORD,
  AccessActionIsAuthenticatedParameters,
  ACCESS_GET_IS_AUTHENTICATED,
  AccessResetPasswordVerifyCodeParameters,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  AccessResetPasswordChangePasswordParameters,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_FINISHED
} from '../types'
import { accessService } from '../../services'
import { api } from '../../services/api'
import { RootState } from '../store'
import { setAlert } from './alerts.actions'

const getLogInSuccess: ActionCreator<AccessActionTypes> = (
  success: GetLogInParametersReducer
) => {
  return { type: GET_LOG_IN, payload: { success, failure: null } }
}
const getLogInFailure: ActionCreator<AccessActionTypes> = () => {
  return { type: GET_LOG_IN, payload: { success: null, failure: true } }
}
const getLocalStorageSuccess: ActionCreator<AccessActionTypes> = (
  success: GetLogInParametersReducer
) => {
  return { type: GET_LOCAL_STORAGE, payload: { success, failure: null } }
}
const getLocalStorageFailure: ActionCreator<AccessActionTypes> = () => {
  return {
    type: GET_LOCAL_STORAGE,
    payload: { success: null, failure: true }
  }
}
const getLogOutSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: GET_LOG_OUT, payload: { success: true, failure: null } }
}
const getLogOutFailure: ActionCreator<AccessActionTypes> = () => {
  return { type: GET_LOG_OUT, payload: { success: null, failure: true } }
}

const accessActionSignUp: ActionCreator<AccessActionTypes> = () => {
  return { type: ACCESS_SIGN_UP }
}

const accessActionResetPassword: ActionCreator<AccessActionTypes> = () => {
  return {
    type: ACCESS_RESET_PASSWORD,
    payload: true
  }
}

const accessActionResetPasswordVerifyCode: ActionCreator<AccessActionTypes> = (
  token: string
) => {
  return {
    type: ACCESS_RESET_PASSWORD_VERIFY_CODE,
    payload: token
  }
}

const accessActionResetPasswordChangePassword: ActionCreator<
  AccessActionTypes
> = () => {
  return {
    type: ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
    payload: true
  }
}

const accessActionResetPasswordFinished: ActionCreator<
  AccessActionTypes
> = () => {
  return { type: ACCESS_RESET_PASSWORD_FINISHED }
}

const accessActionGetIsAuthenticated: ActionCreator<AccessActionTypes> = (
  payload: AccessActionIsAuthenticatedParameters
) => {
  return { type: ACCESS_GET_IS_AUTHENTICATED, payload }
}
const accessActionGetIsAuthenticatedFailure: ActionCreator<
  AccessActionTypes
> = () => {
  return { type: ACCESS_GET_IS_AUTHENTICATED, payload: null }
}

export function getLogIn({ email, password }: GetLogInParametersService) {
  return async dispatch => {
    try {
      const { data } = await accessService.getLogIn({ email, password })
      console.log(data)
      const token = data?.success?.token
      const user = {
        id: data?.success?.user?.id,
        displayName: data?.success?.user?.display_name
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      await localStorage.setItem('@PosicionamentoAuth:token', token)
      await localStorage.setItem(
        '@PosicionamentoAuth:user',
        JSON.stringify(user)
      )

      dispatch(getLogInSuccess({ token, user }))
    } catch (err) {
      console.log(err)

      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          dispatch(
            dispatch(
              setAlert({ type: 'error', message: 'Usuário não encontrado!' })
            )
          )
          break
        case 403:
          dispatch(
            dispatch(setAlert({ type: 'warning', message: 'Senha incorreta.' }))
          )
          break
        default:
          dispatch(
            setAlert({ type: 'error', message: 'Erro ao desconhecido...' })
          )
          break
      }

      getLogInFailure()
    }
  }
}
export function getLocalStorage() {
  return async dispatch => {
    try {
      let token: string | null = null
      let user: { id: number; displayName: string } | null = null
      const storageToken = await localStorage.getItem(
        '@PosicionamentoAuth:token'
      )
      const storageUser = await localStorage.getItem('@PosicionamentoAuth:user')
      if (storageToken && storageUser) {
        token = storageToken
        user = JSON.parse(storageUser)

        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }

      dispatch(getLocalStorageSuccess({ token, user }))
    } catch (err) {
      console.log(err)
      getLocalStorageFailure()
    }
  }
}
export function getLogOut() {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await accessService.getLogOut()
      console.log(data)
      await localStorage.clear()
      delete api.defaults.headers.common.Authorization

      dispatch(getLogOutSuccess())
    } catch (err) {
      console.log(err)
      getLogOutFailure()
    }
  }
}

export function accessSignUp({
  userLogin,
  userPass,
  userEmail,
  displayName
}: AccessSignUpParameters) {
  return async dispatch => {
    try {
      await accessService.accessSignUp({
        userLogin,
        userPass,
        userEmail,
        displayName
      })

      dispatch(accessActionSignUp())
    } catch (err) {
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 409:
          dispatch(setNotification('signUp.error.409'))
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters) {
  return async dispatch => {
    try {
      await accessService.accessResetPassword({ userLogin })
      dispatch(accessActionResetPassword())
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          console.log('404')
          dispatch(
            setNotification('forgotPassword.forgotPasswordEmail.error.404')
          )
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export function accessResetPasswordVerifyCode({
  token
}: AccessResetPasswordVerifyCodeParameters) {
  return async dispatch => {
    try {
      await accessService.accessResetPasswordVerifyCode({ token })
      dispatch(accessActionResetPasswordVerifyCode(token))
    } catch (err) {
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          dispatch(
            setNotification('forgotPassword.forgotPasswordVerifyCode.error.404')
          )
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export function accessResetPasswordChangePassword({
  password
}: AccessResetPasswordChangePasswordParameters) {
  return async (dispatch, getState: RootState) => {
    try {
      const { resetPasswordToken } = getState().access

      await accessService.accessResetPasswordChangePassword({
        token: resetPasswordToken ?? '',
        password
      })
      dispatch(accessActionResetPasswordChangePassword())
    } catch (err) {
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export const accessResetPasswordFinished = () => {
  return dispatch => {
    dispatch(accessActionResetPasswordFinished())
  }
}

export function accessGetIsAuthenticated() {
  return async dispatch => {
    try {
      console.log('accessGetIsAuthenticated')
      await accessService.getIsAuthenticated()

      dispatch(accessActionGetIsAuthenticated({ isAuthenticated: true }))
    } catch (err) {
      console.log('accessGetIsAuthenticatedFailure')
      delete api.defaults.headers.Authorization
      await AsyncStorage.clear()
      dispatch(accessActionGetIsAuthenticatedFailure())
    }
  }
}
