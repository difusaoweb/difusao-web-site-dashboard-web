import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  ProductData,
  ProductsActionTypes,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  CreateProductData
} from '../types'
import { productsService } from '../../services'
import { RootState } from '../store'

const getProductsSuccess: ActionCreator<ProductsActionTypes> = (
  success: ProductData[]
) => {
  return { type: GET_PRODUCTS, payload: success }
}
const getProductsFailure: ActionCreator<ProductsActionTypes> = () => {
  return { type: GET_PRODUCTS, payload: null }
}

const createProductSuccess: ActionCreator<ProductsActionTypes> = (success: {
  product_id: number
}) => {
  return { type: CREATE_PRODUCT, payload: { success, failure: null } }
}
const createProductFailure: ActionCreator<ProductsActionTypes> = () => {
  return { type: CREATE_PRODUCT, payload: { success: null, failure: true } }
}

const deleteProductsSuccess: ActionCreator<ProductsActionTypes> = () => {
  return { type: DELETE_PRODUCTS, payload: true }
}
const deleteProductsFailure: ActionCreator<ProductsActionTypes> = () => {
  return { type: DELETE_PRODUCTS, payload: null }
}

export function getProducts() {
  return async dispatch => {
    try {
      const { data } = await productsService.getProducts()
      dispatch(getProductsSuccess(data?.success))
    } catch (err) {
      console.log(err)
      getProductsFailure()
    }
  }
}

export function createProduct(product: CreateProductData) {
  return async dispatch => {
    try {
      const { data } = await productsService.createProduct(product)
      dispatch(createProductSuccess(data?.success))
    } catch (err) {
      console.log(err)
      dispatch(createProductFailure())
    }
  }
}

export function deleteProducts(ids: number[]) {
  return async dispatch => {
    try {
      console.log('ids')
      console.log(ids)
      const { data } = await productsService.deleteProducts(ids)
      console.log(data)
      dispatch(deleteProductsSuccess())
    } catch (err) {
      console.log(err)
      deleteProductsFailure()
    }
  }
}
