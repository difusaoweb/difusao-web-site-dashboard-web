import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  UserActionTypes,
  ReduxUsersGetUserListReducerPayload,
  REDUX_USERS_GET_USER_LIST,
  ReduxUsersGetUserListServiceParameters,
  ReduxUsersGetUserListFunctionDispatch,
  ReduxUsersGetUserReducerPayload,
  REDUX_USERS_GET_USER,
  ReduxUsersGetUserServiceParameters,
  ReduxUsersGetUserFunctionDispatch,
  ReduxUsersCreateUserReducerPayload,
  REDUX_USERS_CREATE_USER,
  ReduxUsersCreateUserServiceParameters,
  ReduxUsersCreateUserFunctionDispatch,
  ReduxUsersUpdateUserReducerPayload,
  ReduxUsersUpdateUserServiceParameters,
  ReduxUsersUpdateUserFunctionDispatch,
  REDUX_USERS_UPDATE_USER,
  ReduxUsersDeleteUserListReducerPayload,
  REDUX_USERS_DELETE_USER_LIST,
  ReduxUsersDeleteUserListFunctionParameters,
  ReduxUsersDeleteUserListFunctionDispatch
} from '../types'
import { usersService } from '../../services'
import { reduxAlertsSetAlertFunction } from './alerts.actions'

const reduxUsersGetUserListAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersGetUserListReducerPayload
) => {
  return { type: REDUX_USERS_GET_USER_LIST, payload }
}
export function reduxUsersGetUserListFunction({
  page,
  perPage
}: ReduxUsersGetUserListServiceParameters) {
  return async (dispatch: Dispatch<ReduxUsersGetUserListFunctionDispatch>) => {
    try {
      const { data } = await usersService.getUserList({
        page,
        perPage
      })
      const { users, total } = data.success

      dispatch(
        reduxUsersGetUserListAction({
          success: { users, currentPage: page, total },
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
          break
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxUsersGetUserListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxUsersGetUserAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersGetUserReducerPayload
) => {
  return { type: REDUX_USERS_GET_USER, payload }
}
export function reduxUsersGetUserFunction(
  parameters: ReduxUsersGetUserServiceParameters
) {
  return async (dispatch: Dispatch<ReduxUsersGetUserFunctionDispatch>) => {
    try {
      const { data } = await usersService.getUser(parameters)
      const user = data?.success?.user

      dispatch(
        reduxUsersGetUserAction({
          success: { user },
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
          break
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxUsersGetUserAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxUsersCreateUserAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersCreateUserReducerPayload
) => {
  return { type: REDUX_USERS_CREATE_USER, payload }
}
export function reduxUsersCreateUserFunction(
  parameters: ReduxUsersCreateUserServiceParameters
) {
  return async (dispatch: Dispatch<ReduxUsersCreateUserFunctionDispatch>) => {
    try {
      const { data } = await usersService.createUser(parameters)
      const { user } = data.success

      dispatch(
        reduxUsersCreateUserAction({
          success: { user },
          failure: null
        })
      )
      dispatch(
        reduxAlertsSetAlertFunction({
          type: 'success',
          message: 'Mídia enviada!'
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
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxUsersCreateUserAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxUsersUpdateUserAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersUpdateUserReducerPayload
) => {
  return { type: REDUX_USERS_UPDATE_USER, payload }
}
export function reduxUsersUpdateUserFunction({
  userId,
  userTitle
}: ReduxUsersUpdateUserServiceParameters) {
  return async (dispatch: Dispatch<ReduxUsersUpdateUserFunctionDispatch>) => {
    try {
      const { data } = await usersService.updateUser({
        userId,
        userTitle
      })

      const updated = data?.success?.updated

      dispatch(
        reduxUsersUpdateUserAction({
          success: { updated, userId, userTitle },
          failure: null
        })
      )
      dispatch(
        reduxAlertsSetAlertFunction({ type: 'success', message: 'Atualizado!' })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxUsersUpdateUserAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxUsersDeleteUserListAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersDeleteUserListReducerPayload
) => {
  return { type: REDUX_USERS_DELETE_USER_LIST, payload }
}
export function reduxUsersDeleteUserListFunction({
  usersId,
  setUsersHaveBeenDeleted
}: ReduxUsersDeleteUserListFunctionParameters) {
  return async (
    dispatch: Dispatch<ReduxUsersDeleteUserListFunctionDispatch>
  ) => {
    try {
      await usersService.deleteUserList({
        usersId
      })

      setUsersHaveBeenDeleted(true)

      dispatch(
        reduxUsersDeleteUserListAction({
          success: { usersId },
          failure: null
        })
      )
      const alertMessage =
        usersId.length > 1 ? 'Usuários apagados!' : 'Usuário apagado!'
      dispatch(
        reduxAlertsSetAlertFunction({ type: 'success', message: alertMessage })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      setUsersHaveBeenDeleted(false)

      switch (status) {
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxUsersDeleteUserListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}
