import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  CreateServiceData,
  ReduxServicesGetServiceListServiceParameters
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

async function deleteServices(ids: number[]): Promise<AxiosResponse> {
  return await api.get('/services/delete', { params: { service_ids: ids } })
}

async function getServiceList({
  page,
  perPage
}: ReduxServicesGetServiceListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/services/list', {
    params: { page, per_page: perPage }
  })
}

export const servicesService = { getServiceList, createService, deleteServices }
