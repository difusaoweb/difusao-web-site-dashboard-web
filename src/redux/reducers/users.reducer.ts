import {
  UserState,
  UserActionTypes,
  REDUX_USERS_GET_USER_LIST,
  REDUX_USERS_GET_USER,
  REDUX_USERS_CREATE_USER,
  REDUX_USERS_UPDATE_USER,
  REDUX_USERS_DELETE_USER_LIST
} from '../types'

const initialState: UserState = {
  getUserListUsers: null,
  getUserListLastPage: null,
  getUserListTotal: null,
  getUserListError: null,
  getUserUser: null,
  getUserError: null,
  createUserError: null,
  updateUserUpdated: null,
  updateUserError: null,
  deleteUserListError: null
}

export function usersReducer(
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case REDUX_USERS_GET_USER_LIST: {
      let getUserListUsers = state.getUserListUsers
      if (action.payload.success) {
        const { currentPage, users } = action.payload.success

        if (getUserListUsers) {
          if (currentPage === 1) {
            getUserListUsers = users
          } else {
            getUserListUsers = [...getUserListUsers, ...users]
          }
        } else {
          getUserListUsers = users
        }
      }
      return {
        ...state,
        getUserListUsers,
        getUserListLastPage: action.payload.success?.lastPage ?? null,
        getUserListTotal: action.payload.success?.total ?? null,
        getUserListError: action.payload.failure
      }
    }
    case REDUX_USERS_GET_USER: {
      return {
        ...state,
        getUserUser: action.payload.success?.user ?? null,
        getUserError: action.payload.failure
      }
    }
    case REDUX_USERS_CREATE_USER: {
      if (!state.getUserListUsers) return { ...state }
      if (!action.payload.success) return { ...state }

      const users = state.getUserListUsers
      const getUserListUsers = users.concat(action.payload.success.user)
      return {
        ...state,
        getUserListUsers,
        createUserError: action.payload.failure
      }
    }
    case REDUX_USERS_UPDATE_USER: {
      if (action.payload.success) {
        if (!state.getUserListUsers) return { ...state }

        const { updated, userId, userTitle } = action.payload.success

        const getUserListUsers = state.getUserListUsers
        const userIndex = getUserListUsers.findIndex(user => userId === user.id)

        Object.freeze(getUserListUsers)
        getUserListUsers[userIndex].title = userTitle

        return {
          ...state,
          getUserListUsers,
          updateUserUpdated: updated ?? null
        }
      } else {
        return {
          ...state,
          updateUserError: action.payload.failure
        }
      }
    }
    case REDUX_USERS_DELETE_USER_LIST: {
      if (action.payload.success) {
        let getUserListUsers = state.getUserListUsers
        if (!getUserListUsers) return state

        const { usersId } = action.payload.success
        getUserListUsers = getUserListUsers.filter(
          user => usersId.filter(id => id === user.id).length < 1
        )
        return {
          ...state,
          getUserListUsers,
          deleteUserListError: null
        }
      } else {
        return {
          ...state,
          deleteUserListError: action.payload.failure
        }
      }
    }
    default:
      return state
  }
}
