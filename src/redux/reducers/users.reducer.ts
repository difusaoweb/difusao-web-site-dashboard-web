import {
  GET_USERS,
  CREATE_USER,
  DELETE_USERS,
  UsersActionTypes,
  UsersState
} from '../types'

const initialState: UsersState = {
  usersList: null,
  createUserReturn: {
    success: null,
    failure: null
  },
  deletedUsers: null
}

export function usersReducer(
  state: UsersState = initialState,
  action: UsersActionTypes
): UsersState {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        usersList: action.payload ?? null
      }
    }
    case CREATE_USER: {
      return {
        ...state,
        createUserReturn: action.payload ?? null
      }
    }
    case DELETE_USERS: {
      return {
        ...state,
        deletedUsers: action.payload
      }
    }
    default:
      return state
  }
}
