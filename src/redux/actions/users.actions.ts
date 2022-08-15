import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  UserData,
  UsersActionTypes,
  GET_USERS,
  CREATE_USER,
  DELETE_USERS,
  CreateUserData
} from '../types'
import { usersService } from '../../services'
import { RootState } from '../store'

const getUsersSuccess: ActionCreator<UsersActionTypes> = (
  success: UserData[]
) => {
  return { type: GET_USERS, payload: success }
}
const getUsersFailure: ActionCreator<UsersActionTypes> = () => {
  return { type: GET_USERS, payload: null }
}

const createUserSuccess: ActionCreator<UsersActionTypes> = (success: {
  user_id: number
}) => {
  return { type: CREATE_USER, payload: { success, failure: null } }
}
const createUserFailure: ActionCreator<UsersActionTypes> = () => {
  return { type: CREATE_USER, payload: { success: null, failure: true } }
}

const deleteUsersSuccess: ActionCreator<UsersActionTypes> = () => {
  return { type: DELETE_USERS, payload: true }
}
const deleteUsersFailure: ActionCreator<UsersActionTypes> = () => {
  return { type: DELETE_USERS, payload: null }
}

export function getUsers() {
  return async dispatch => {
    try {
      const { data } = await usersService.getUsers()
      dispatch(getUsersSuccess(data?.success))
    } catch (err) {
      console.log(err)
      getUsersFailure()
    }
  }
}

export function createUser(user: CreateUserData) {
  return async dispatch => {
    try {
      const { data } = await usersService.createUser(user)
      dispatch(createUserSuccess(data?.success))
    } catch (err) {
      console.log(err)
      dispatch(createUserFailure())
    }
  }
}

export function deleteUsers(ids: number[]) {
  return async dispatch => {
    try {
      console.log('ids')
      console.log(ids)
      const { data } = await usersService.deleteUsers(ids)
      console.log(data)
      dispatch(deleteUsersSuccess())
    } catch (err) {
      console.log(err)
      deleteUsersFailure()
    }
  }
}
