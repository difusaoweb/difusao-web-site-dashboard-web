import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  AccessActionTypes,
  GET_LOG_OUT,
  AccessResetPasswordParameters,
  ACCESS_RESET_PASSWORD,
  AccessResetPasswordVerifyCodeParameters,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  AccessResetPasswordChangePasswordParameters,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_FINISHED,
  ReduxAccessGetLoginReducerPayload,
  REDUX_ACCESS_GET_LOGIN,
  ReduxAccessGetLoginServiceParameters,
  ReduxAccessGetStorageDataReducerPayload,
  REDUX_ACCESS_GET_STORAGE_DATA,
  ReduxAccessGetStorageDataUser,
  ReduxAccessCheckAuthenticationReducerPayload,
  REDUX_ACCESS_CHECK_AUTHENTICATION,
  AlertActionTypes
} from '../types'
import { accessService } from '../../services'
import { api } from '../../services/api'
import { RootState } from '../store'
import { setAlert } from './alerts.actions'

const getLogOutSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: GET_LOG_OUT, payload: { success: true, failure: null } }
}
const getLogOutFailure: ActionCreator<AccessActionTypes> = () => {
  return { type: GET_LOG_OUT, payload: { success: null, failure: true } }
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

const accessActionGetIsAuthenticatedFailure: ActionCreator<
  AccessActionTypes
> = () => {
  return { type: ACCESS_GET_IS_AUTHENTICATED, payload: null }
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

const reduxAccessGetStorageDataAction: ActionCreator<AccessActionTypes> = (
  payload: ReduxAccessGetStorageDataReducerPayload
) => {
  return { type: REDUX_ACCESS_GET_STORAGE_DATA, payload }
}
export function reduxAccessGetStorageDataFunction() {
  return async (dispatch: Dispatch<AccessActionTypes>) => {
    try {
      let token: string | null = null
      let user: ReduxAccessGetStorageDataUser | null = null
      const storageToken = await localStorage.getItem(
        '@DifusaoWebSiteDashboard:token'
      )
      const storageUser = await localStorage.getItem(
        '@DifusaoWebSiteDashboard:user'
      )
      if (storageToken && storageUser) {
        token = storageToken
        user = JSON.parse(storageUser)

        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }

      dispatch(
        reduxAccessGetStorageDataAction({
          success: { token, user },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      setAlert({ type: 'error', message: 'Erro desconhecido!' })
      dispatch(
        reduxAccessGetStorageDataAction({
          success: null,
          failure: { status: 0 }
        })
      )
    }
  }
}

const reduxAccessCheckAuthenticationAction: ActionCreator<AccessActionTypes> = (
  payload: ReduxAccessCheckAuthenticationReducerPayload
) => {
  return { type: REDUX_ACCESS_CHECK_AUTHENTICATION, payload }
}
export function reduxAccessCheckAuthenticationFunction() {
  return async (dispatch: Dispatch<AccessActionTypes>) => {
    try {
      const { data } = await accessService.checkAuthentication()

      const authenticated = data?.success?.authenticated

      dispatch(
        reduxAccessCheckAuthenticationAction({
          success: { authenticated },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      delete api.defaults.headers.common.Authorization
      await localStorage.clear()

      if (status !== 401) {
        setAlert({ type: 'error', message: 'Erro desconhecido!' })
      }

      dispatch(
        reduxAccessCheckAuthenticationAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxAccessGetLoginAction: ActionCreator<AccessActionTypes> = (
  payload: ReduxAccessGetLoginReducerPayload
) => {
  return { type: REDUX_ACCESS_GET_LOGIN, payload }
}
type reduxAccessGetLoginFunctionType = ReturnType<
  typeof AccessActionTypes | typeof AlertActionTypes
>
export function reduxAccessGetLoginFunction(
  parameters: ReduxAccessGetLoginServiceParameters
) {
  return async (dispatch: Dispatch<reduxAccessGetLoginFunctionType>) => {
    try {
      const { data } = await accessService.getLogin(parameters)
      const token = data?.success?.token
      const user = {
        id: data?.success?.user?.id,
        name: data?.success?.user?.name
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      await localStorage.setItem('@DifusaoWebSiteDashboard:token', token)
      await localStorage.setItem(
        '@DifusaoWebSiteDashboard:user',
        JSON.stringify(user)
      )

      dispatch(
        reduxAccessGetLoginAction({
          success: { token, user },
          failure: null
        })
      )
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
            setAlert({ type: 'error', message: 'Usuário não encontrado!' })
          )
          break
        case 403:
          dispatch(setAlert({ type: 'warning', message: 'Senha incorreta.' }))
          break
        default:
          dispatch(
            setAlert({ type: 'error', message: 'Erro ao desconhecido...' })
          )
          break
      }

      dispatch(
        reduxAccessGetLoginAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}
