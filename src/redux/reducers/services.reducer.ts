import {
  CREATE_SERVICE,
  ServiceState,
  ServiceActionTypes,
  REDUX_SERVICES_GET_SERVICE_LIST,
  REDUX_SERVICES_DELETE_SERVICE_LIST
} from '../types'

const initialState: ServiceState = {
  createServiceReturn: {
    success: null,
    failure: null
  },
  getServiceListServices: null,
  getServiceListLastPage: null,
  getServiceListTotal: null,
  getServiceListError: null,
  deleteServiceListDeleted: null,
  deleteServiceListError: null
}

export function servicesReducer(
  state: ServiceState = initialState,
  action: ServiceActionTypes
): ServiceState {
  switch (action.type) {
    case CREATE_SERVICE: {
      return {
        ...state,
        createServiceReturn: action.payload ?? null
      }
    }
    case REDUX_SERVICES_GET_SERVICE_LIST: {
      let getServiceListServices = state.getServiceListServices
      if (action.payload.success?.services) {
        if (getServiceListServices) {
          if (action.payload.success?.currentPage === 1) {
            getServiceListServices = action.payload.success?.services
          } else {
            getServiceListServices = [
              ...getServiceListServices,
              ...action.payload.success?.services
            ]
          }
        } else {
          getServiceListServices = action.payload.success?.services
        }
      }
      return {
        ...state,
        getServiceListServices,
        getServiceListLastPage: action.payload.success?.lastPage ?? null,
        getServiceListTotal: action.payload.success?.total ?? null,
        getServiceListError: action.payload.failure
      }
    }
    case REDUX_SERVICES_DELETE_SERVICE_LIST: {
      return {
        ...state,
        deleteServiceListDeleted: action.payload.success?.deleted ?? null,
        deleteServiceListError: action.payload.failure
      }
    }
    default:
      return state
  }
}
