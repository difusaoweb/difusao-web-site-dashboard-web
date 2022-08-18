import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  CreateServiceData,
  ReduxServicesGetServiceListServiceParameters,
  ReduxServicesDeleteServiceListServiceParameters
} from '../redux'

async function createService({
  name,
  description,
  stock,
  images,
  sku,
  price,
  categoryId
}: CreateServiceData): Promise<AxiosResponse> {
  return await api.get('/services/create', {
    params: {
      name,
      description,
      stock: stock ? 1 : 0,
      images,
      sku,
      price,
      category_id: categoryId
    }
  })
}

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

export const servicesService = {
  createService,
  getServiceList,
  deleteServiceList
}
