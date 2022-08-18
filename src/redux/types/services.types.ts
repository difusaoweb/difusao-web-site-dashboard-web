import { ReturnErrorInterface, ErrorStatus } from './common.types'

export interface CreateServiceData {
  name: string
  description: string | null
  images: string[] | null
  sku: number | null
  stock: boolean
  price: number
  categoryId: number | null
}

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
  } | null
  failure: ErrorStatus | null
}

export const CREATE_SERVICE = 'CREATE_SERVICE'
interface CreateServicesAction {
  type: typeof CREATE_SERVICE
  payload: {
    success: { service_id: number } | null
    failure: true | null
  }
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

export interface ServiceState {
  createServiceReturn: {
    success: { service_id: number } | null
    failure: true | null
  }

  getServiceListServices: ServiceData[] | null
  getServiceListLastPage: number | null
  getServiceListTotal: number | null
  getServiceListError: ErrorStatus | null

  deleteServiceListDeleted: boolean | null
  deleteServiceListError: ErrorStatus | null
}

export type ServiceActionTypes =
  | CreateServicesAction
  | ReduxServicesGetServiceListReducer
  | ReduxServicesDeleteServiceListReducer
