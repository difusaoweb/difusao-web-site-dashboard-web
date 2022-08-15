import { AxiosResponse } from 'axios'

import { api } from './api'
import { CreateProductData } from '../redux'

export const productsService = { getProducts, createProduct, deleteProducts }

async function getProducts(): Promise<AxiosResponse> {
  return await api.get('/products/list')
}

async function createProduct({
  name,
  description,
  stock,
  images,
  sku,
  price,
  categoryId
}: CreateProductData): Promise<AxiosResponse> {
  return await api.get('/products/create', {
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

async function deleteProducts(ids: number[]): Promise<AxiosResponse> {
  return await api.get('/products/delete', { params: { product_ids: ids } })
}
