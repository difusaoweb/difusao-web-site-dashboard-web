import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  ServiceActionTypes,
  CREATE_SERVICE,
  CreateServiceData,
  ReduxServicesGetServiceListReducerPayload,
  REDUX_SERVICES_GET_SERVICE_LIST,
  ReduxServicesGetServiceListServiceParameters,
  ReduxServicesDeleteServiceListReducerPayload,
  REDUX_SERVICES_DELETE_SERVICE_LIST,
  ReduxServicesDeleteServiceListServiceParameters
} from '../types'
import { servicesService } from '../../services'
import { setAlert } from './alerts.actions'

const createServiceSuccess: ActionCreator<ServiceActionTypes> = (success: {
  service_id: number
}) => {
  return { type: CREATE_SERVICE, payload: { success, failure: null } }
}
const createServiceFailure: ActionCreator<ServiceActionTypes> = () => {
  return { type: CREATE_SERVICE, payload: { success: null, failure: true } }
}
export function createService(service: CreateServiceData) {
  return async dispatch => {
    try {
      const { data } = await servicesService.createService(service)
      dispatch(createServiceSuccess(data?.success))
    } catch (err) {
      console.log(err)
      dispatch(createServiceFailure())
    }
  }
}

const reduxServicesGetServiceListAction: ActionCreator<ServiceActionTypes> = (
  payload: ReduxServicesGetServiceListReducerPayload
) => {
  return { type: REDUX_SERVICES_GET_SERVICE_LIST, payload }
}
type reduxServicesGetServiceListFunctionType = ReturnType<
  typeof ServiceActionTypes | typeof AlertActionTypes
>
export function reduxServicesGetServiceListFunction({
  page,
  perPage
}: ReduxServicesGetServiceListServiceParameters) {
  return async (
    dispatch: Dispatch<reduxServicesGetServiceListFunctionType>
  ) => {
    try {
      const { data } = await servicesService.getServiceList({ page, perPage })
      const services = data?.success?.services
      const lastPage = data?.success?.last_page
      const total = data?.success?.total

      dispatch(
        reduxServicesGetServiceListAction({
          success: { services, lastPage, currentPage: page, total },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          dispatch(
            setAlert({ type: 'info', message: 'Serviços não encontrado!' })
          )
          break
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxServicesGetServiceListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxServicesDeleteServiceListAction: ActionCreator<
  ServiceActionTypes
> = (payload: ReduxServicesDeleteServiceListReducerPayload) => {
  return { type: REDUX_SERVICES_DELETE_SERVICE_LIST, payload }
}
type reduxServicesDeleteServiceListFunctionType = ReturnType<
  typeof ServiceActionTypes | typeof AlertActionTypes
>
export function reduxServicesDeleteServiceListFunction(
  parameters: ReduxServicesDeleteServiceListServiceParameters
) {
  return async (
    dispatch: Dispatch<reduxServicesDeleteServiceListFunctionType>
  ) => {
    try {
      const { data } = await servicesService.deleteServiceList(parameters)
      const deleted = data?.success?.deleted

      dispatch(
        reduxServicesDeleteServiceListAction({
          success: { deleted },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxServicesDeleteServiceListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}
