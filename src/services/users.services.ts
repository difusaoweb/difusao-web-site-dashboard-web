import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxUsersGetUserListServiceParameters,
  ReduxUsersGetUserServiceParameters,
  ReduxUsersCreateUserServiceParameters,
  ReduxUsersUpdateUserServiceParameters,
  ReduxUsersDeleteUserListServiceParameters
} from '../redux'

async function getUserList(
  parameters: ReduxUsersGetUserListServiceParameters
): Promise<AxiosResponse> {
  return await api.get('/users/list', {
    params: parameters
  })
}

async function getUser({
  userId
}: ReduxUsersGetUserServiceParameters): Promise<AxiosResponse> {
  return await api.get('/users/show', {
    params: { user_id: userId }
  })
}

async function createUser(
  parameters: ReduxUsersCreateUserServiceParameters
): Promise<AxiosResponse> {
  return await api.get('/users/create', { params: parameters })
}

async function updateUser({
  userId,
  userTitle
}: ReduxUsersUpdateUserServiceParameters): Promise<AxiosResponse> {
  return await api.get('/users/update', {
    params: {
      user_id: userId,
      user_title: userTitle
    }
  })
}

async function deleteUserList(
  parameters: ReduxUsersDeleteUserListServiceParameters
): Promise<AxiosResponse> {
  return await api.get('/users/delete', {
    params: parameters
  })
}

export const usersService = {
  getUserList,
  getUser,
  createUser,
  updateUser,
  deleteUserList
}
