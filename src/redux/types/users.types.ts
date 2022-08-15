export interface UserData {
  id: number
  image: string
  name: string
  email: string
  created_at: string
}

export interface CreateUserData {
  image: string | null
  name: string
  email: string
  password: string
}

export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const DELETE_USERS = 'DELETE_USERS'

interface GetUsersAction {
  type: typeof GET_USERS
  payload: UserData[] | null
}

interface CreateUsersAction {
  type: typeof CREATE_USER
  payload: {
    success: { user_id: number } | null
    failure: true | null
  }
}

interface DeleteUsersAction {
  type: typeof DELETE_USERS
  payload: true | null
}

export interface UsersState {
  usersList: UserData[] | null
  createUserReturn: {
    success: { user_id: number } | null
    failure: true | null
  }
  deletedUsers: true | null
}

export type UsersActionTypes =
  | GetUsersAction
  | CreateUsersAction
  | DeleteUsersAction
