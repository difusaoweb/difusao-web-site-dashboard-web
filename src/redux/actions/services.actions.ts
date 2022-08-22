import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  ServiceActionTypes,
  ReduxServicesGetServiceListReducerPayload,
  REDUX_SERVICES_GET_SERVICE_LIST,
  ReduxServicesGetServiceListServiceParameters,
  ReduxServicesDeleteServiceListReducerPayload,
  REDUX_SERVICES_DELETE_SERVICE_LIST,
  ReduxServicesDeleteServiceListServiceParameters,
  ReduxServicesCreateServiceReducerPayload,
  REDUX_SERVICES_CREATE_SERVICE,
  ReduxServicesCreateServiceServiceParameters
} from '../types'
import { servicesService } from '../../services'
import { setAlert } from './alerts.actions'

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
export function reduxServicesDeleteServiceListFunction({
  servicesId
}: ReduxServicesDeleteServiceListServiceParameters) {
  return async (
    dispatch: Dispatch<reduxServicesDeleteServiceListFunctionType>
  ) => {
    try {
      const { data } = await servicesService.deleteServiceList({ servicesId })
      const deleted = data?.success?.deleted

      dispatch(
        reduxServicesDeleteServiceListAction({
          success: { deleted, servicesId },
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

const reduxServicesCreateServiceAction: ActionCreator<ServiceActionTypes> = (
  payload: ReduxServicesCreateServiceReducerPayload
) => {
  return { type: REDUX_SERVICES_CREATE_SERVICE, payload }
}
type reduxServicesCreateServiceFunctionType = ReturnType<
  typeof ServiceActionTypes | typeof AlertActionTypes
>
export function reduxServicesCreateServiceFunction(
  parameters: ReduxServicesCreateServiceServiceParameters
) {
  return async (dispatch: Dispatch<reduxServicesCreateServiceFunctionType>) => {
    try {
      const { data } = await servicesService.createService(parameters)
      const serviceId = data?.success?.service_id

      dispatch(
        reduxServicesCreateServiceAction({
          success: { serviceId },
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
        reduxServicesCreateServiceAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}
