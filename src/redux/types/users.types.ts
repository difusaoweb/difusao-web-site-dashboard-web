import { NumberOrNull, BooleanOrNull, ErrorStatusOrNull } from './common.types'

export interface GetUserListUserType {
  id: number
  name: string
  email: string
  createdAt: string
}

export interface ReduxUsersGetUserListServiceParameters {
  page: number
  perPage: number
}
export type ReduxUsersGetUserListFunctionDispatch = ReturnType<
  typeof UserActionTypes | typeof AlertActionTypes
>
export interface ReduxUsersGetUserListReducerPayload {
  success: {
    users: GetUserListUserType[]
    currentPage: number
    lastPage: number
    total: number
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxUsersGetUserServiceParameters {
  userId: number
}
export type ReduxUsersGetUserFunctionDispatch = ReturnType<
  typeof UserActionTypes | typeof AlertActionTypes
>
export interface ReduxUsersGetUserReducerPayload {
  success: {
    user: GetUserListUserType
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxUsersCreateUserServiceParameters {
  name: string
  email: string
  password: string
}
export type ReduxUsersCreateUserFunctionDispatch = ReturnType<
  typeof UserActionTypes | typeof AlertActionTypes
>
export interface ReduxUsersCreateUserReducerPayload {
  success: {
    user: UserData
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxUsersUpdateUserServiceParameters {
  userId: number
  userTitle: string
}
export type ReduxUsersUpdateUserFunctionDispatch = ReturnType<
  typeof UserActionTypes | typeof AlertActionTypes
>
export interface ReduxUsersUpdateUserReducerPayload {
  success: {
    updated: boolean
    userId: number
    userTitle: string
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxUsersDeleteUserListFunctionParameters {
  usersId: number[]
  setUsersHaveBeenDeleted(value: React.SetStateAction<boolean>): void
}
export interface ReduxUsersDeleteUserListServiceParameters {
  usersId: number[]
}
export type ReduxUsersDeleteUserListFunctionDispatch = ReturnType<
  typeof UserActionTypes | typeof AlertActionTypes
>
export interface ReduxUsersDeleteUserListReducerPayload {
  success: {
    usersId: number[]
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxUsersClearStateServiceParameters {
  state: string[]
}

export const REDUX_USERS_GET_USER_LIST = 'REDUX_USERS_GET_USER_LIST'
interface ReduxUsersGetUserListReducer {
  type: typeof REDUX_USERS_GET_USER_LIST
  payload: ReduxUsersGetUserListReducerPayload
}

export const REDUX_USERS_GET_USER = 'REDUX_USERS_GET_USER'
interface ReduxUsersGetUserReducer {
  type: typeof REDUX_USERS_GET_USER
  payload: ReduxUsersGetUserReducerPayload
}

export const REDUX_USERS_CREATE_USER = 'REDUX_USERS_CREATE_USER'
interface ReduxUsersCreateUserReducer {
  type: typeof REDUX_USERS_CREATE_USER
  payload: ReduxUsersCreateUserReducerPayload
}

export const REDUX_USERS_UPDATE_USER = 'REDUX_USERS_UPDATE_USER'
interface ReduxUsersUpdateUserReducer {
  type: typeof REDUX_USERS_UPDATE_USER
  payload: ReduxUsersUpdateUserReducerPayload
}

export const REDUX_USERS_DELETE_USER_LIST = 'REDUX_USERS_DELETE_USER_LIST'
interface ReduxUsersDeleteUserListReducer {
  type: typeof REDUX_USERS_DELETE_USER_LIST
  payload: ReduxUsersDeleteUserListReducerPayload
}

export interface UserState {
  getUserListUsers: GetUserListUserType[] | null
  getUserListTotal: NumberOrNull
  getUserListError: ErrorStatusOrNull

  getUserUser: UserData | null
  getUserError: ErrorStatusOrNull

  createUserError: ErrorStatusOrNull

  updateUserUpdated: BooleanOrNull
  updateUserError: ErrorStatusOrNull

  deleteUserListError: ErrorStatusOrNull
}

export type UserActionTypes =
  | ReduxUsersGetUserListReducer
  | ReduxUsersGetUserReducer
  | ReduxUsersCreateUserReducer
  | ReduxUsersUpdateUserReducer
  | ReduxUsersDeleteUserListReducer
