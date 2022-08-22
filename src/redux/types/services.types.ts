import { ReturnErrorInterface, ErrorStatus } from './common.types'

export interface ReduxServicesGetServiceListServiceParameters {
  page: number
  perPage: number
}
export interface ServiceData {
  id: number
  image: string
  title: string
  description: string
  created_at: string
}
export interface ReduxServicesGetServiceListReducerPayload {
  success: {
    services: ServiceData[]
    currentPage: number
    lastPage: number
    total: number
  } | null
  failure: ErrorStatus | null
}

export interface ReduxServicesDeleteServiceListServiceParameters {
  servicesId: number[]
}
export interface ReduxServicesDeleteServiceListReducerPayload {
  success: {
    deleted: boolean
    servicesId: number[]
  } | null
  failure: ErrorStatus | null
}

export interface ReduxServicesCreateServiceServiceParameters {
  title: string
  description: string
  image: number
}
export interface ReduxServicesCreateServiceReducerPayload {
  success: {
    serviceId: number
  } | null
  failure: ErrorStatus | null
}

export const REDUX_SERVICES_GET_SERVICE_LIST = 'REDUX_SERVICES_GET_SERVICE_LIST'
interface ReduxServicesGetServiceListReducer {
  type: typeof REDUX_SERVICES_GET_SERVICE_LIST
  payload: ReduxServicesGetServiceListReducerPayload
}

export const REDUX_SERVICES_DELETE_SERVICE_LIST =
  'REDUX_SERVICES_DELETE_SERVICE_LIST'
interface ReduxServicesDeleteServiceListReducer {
  type: typeof REDUX_SERVICES_DELETE_SERVICE_LIST
  payload: ReduxServicesDeleteServiceListReducerPayload
}

export const REDUX_SERVICES_CREATE_SERVICE = 'REDUX_SERVICES_CREATE_SERVICE'
interface ReduxServicesCreateServiceReducer {
  type: typeof REDUX_SERVICES_CREATE_SERVICE
  payload: ReduxServicesCreateServiceReducerPayload
}

export interface ServiceState {
  getServiceListServices: ServiceData[] | null
  getServiceListLastPage: number | null
  getServiceListTotal: number | null
  getServiceListError: ErrorStatus | null

  deleteServiceListDeleted: boolean | null
  deleteServiceListError: ErrorStatus | null

  createServiceServiceId: number | null
  createServiceError: ErrorStatus | null
}

export type ServiceActionTypes =
  | ReduxServicesGetServiceListReducer
  | ReduxServicesDeleteServiceListReducer
  | ReduxServicesCreateServiceReducer
