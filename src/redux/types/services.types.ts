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

export const CREATE_SERVICE = 'CREATE_SERVICE'
export const DELETE_SERVICES = 'DELETE_SERVICES'

interface CreateServicesAction {
  type: typeof CREATE_SERVICE
  payload: {
    success: { service_id: number } | null
    failure: true | null
  }
}

interface DeleteServicesAction {
  type: typeof DELETE_SERVICES
  payload: true | null
}

export const REDUX_SERVICES_GET_SERVICE_LIST = 'REDUX_SERVICES_GET_SERVICE_LIST'
interface ReduxServicesGetServiceListReducer {
  type: typeof REDUX_SERVICES_GET_SERVICE_LIST
  payload: ReduxServicesGetServiceListReducerPayload
}

export interface ServiceState {
  createServiceReturn: {
    success: { service_id: number } | null
    failure: true | null
  }
  deletedServices: true | null

  getServiceListServices: ServiceData[] | null
  getServiceListLastPage: number | null
  getServiceListTotal: number | null
  getServiceListError: ErrorStatus | null
}

export type ServiceActionTypes =
  | CreateServicesAction
  | DeleteServicesAction
  | ReduxServicesGetServiceListReducer
