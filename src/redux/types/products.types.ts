export interface ProductData {
  id: number
  image: string
  name: string
  sku: number
  stock: boolean
  created_at: string
  price: string
  category: string
}

export interface CreateProductData {
  name: string
  description: string | null
  images: string[] | null
  sku: number | null
  stock: boolean
  price: number
  categoryId: number | null
}

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

interface GetProductsAction {
  type: typeof GET_PRODUCTS
  payload: ProductData[] | null
}

interface CreateProductsAction {
  type: typeof CREATE_PRODUCT
  payload: {
    success: { product_id: number } | null
    failure: true | null
  }
}

interface DeleteProductsAction {
  type: typeof DELETE_PRODUCTS
  payload: true | null
}

export interface ProductsState {
  productsList: ProductData[] | null
  createProductReturn: {
    success: { product_id: number } | null
    failure: true | null
  }
  deletedProducts: true | null
}

export type ProductsActionTypes =
  | GetProductsAction
  | CreateProductsAction
  | DeleteProductsAction
