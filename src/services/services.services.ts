import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxServicesGetServiceListServiceParameters,
  ReduxServicesDeleteServiceListServiceParameters,
  ReduxServicesCreateServiceServiceParameters
} from '../redux'

async function getServiceList({
  page,
  perPage
}: ReduxServicesGetServiceListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/services/list', {
    params: { page, per_page: perPage }
  })
}

async function deleteServiceList({
  servicesId
}: ReduxServicesDeleteServiceListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/services/delete', {
    params: { services_id: servicesId }
  })
}

async function createService({
  title,
  description,
  image
}: ReduxServicesCreateServiceServiceParameters): Promise<AxiosResponse> {
  return await api.get('/services/create', {
    params: {
      title,
      description,
      image
    }
  })
}

export const servicesService = {
  getServiceList,
  deleteServiceList,
  createService
}
