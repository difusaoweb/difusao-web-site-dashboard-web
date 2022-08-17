import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  ServiceActionTypes,
  CREATE_SERVICE,
  DELETE_SERVICES,
  CreateServiceData,
  ReduxServicesGetServiceListReducerPayload,
  REDUX_SERVICES_GET_SERVICE_LIST,
  ReduxServicesGetServiceListServiceParameters
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

const deleteServicesSuccess: ActionCreator<ServiceActionTypes> = () => {
  return { type: DELETE_SERVICES, payload: true }
}
const deleteServicesFailure: ActionCreator<ServiceActionTypes> = () => {
  return { type: DELETE_SERVICES, payload: null }
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

export function deleteServices(ids: number[]) {
  return async dispatch => {
    try {
      console.log('ids')
      console.log(ids)
      const { data } = await servicesService.deleteServices(ids)
      console.log(data)
      dispatch(deleteServicesSuccess())
    } catch (err) {
      console.log(err)
      deleteServicesFailure()
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
            setAlert({ type: 'error', message: 'Serviço não encontrado!' })
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
