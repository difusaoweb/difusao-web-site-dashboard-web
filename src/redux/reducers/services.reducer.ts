import {
  ServiceState,
  ServiceActionTypes,
  REDUX_SERVICES_GET_SERVICE_LIST,
  REDUX_SERVICES_DELETE_SERVICE_LIST,
  REDUX_SERVICES_CREATE_SERVICE
} from '../types'

const initialState: ServiceState = {
  getServiceListServices: null,
  getServiceListLastPage: null,
  getServiceListTotal: null,
  getServiceListError: null,
  deleteServiceListDeleted: null,
  deleteServiceListError: null,
  createServiceServiceId: null,
  createServiceError: null
}

export function servicesReducer(
  state: ServiceState = initialState,
  action: ServiceActionTypes
): ServiceState {
  switch (action.type) {
    case REDUX_SERVICES_GET_SERVICE_LIST: {
      let getServiceListServices = state.getServiceListServices
      if (action.payload.success) {
        const { currentPage, services } = action.payload.success

        if (getServiceListServices) {
          if (currentPage === 1) {
            getServiceListServices = services
          } else {
            getServiceListServices = [...getServiceListServices, ...services]
          }
        } else {
          getServiceListServices = services
        }
      }
      return {
        ...state,
        getServiceListServices,
        getServiceListLastPage: action.payload.success?.lastPage ?? null,
        getServiceListTotal: action.payload.success?.total ?? null,
        getServiceListError: action.payload.failure,
        deleteServiceListDeleted: null,
        deleteServiceListError: null
      }
    }
    case REDUX_SERVICES_DELETE_SERVICE_LIST: {
      return {
        ...state,
        deleteServiceListDeleted: action.payload.success?.deleted ?? null,
        deleteServiceListError: action.payload.failure
      }
    }
    case REDUX_SERVICES_CREATE_SERVICE: {
      return {
        ...state,
        createServiceServiceId: action.payload.success?.serviceId ?? null,
        createServiceError: action.payload.failure
      }
    }
    default:
      return state
  }
}
