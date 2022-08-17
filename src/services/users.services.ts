import { AxiosResponse } from 'axios'

import { api } from './api'
import { CreateUserData } from '../redux'

export const usersService = { getUsers, createUser, deleteUsers }

async function getUsers(): Promise<AxiosResponse> {
  return await api.get('/users/list')
}

async function createUser({
  name,
  description,
  stock,
  images,
  sku,
  price,
  categoryId
}: CreateUserData): Promise<AxiosResponse> {
  return await api.get('/users/create', {
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

async function deleteUsers(ids: number[]): Promise<AxiosResponse> {
  return await api.get('/users/delete', { params: { service_ids: ids } })
}
