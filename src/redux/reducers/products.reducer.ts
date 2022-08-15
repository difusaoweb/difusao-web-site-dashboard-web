import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  ProductsActionTypes,
  ProductsState
} from '../types'

const initialState: ProductsState = {
  productsList: null,
  createProductReturn: {
    success: null,
    failure: null
  },
  deletedProducts: null
}

export function productsReducer(
  state: ProductsState = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        productsList: action.payload ?? null
      }
    }
    case CREATE_PRODUCT: {
      return {
        ...state,
        createProductReturn: action.payload ?? null
      }
    }
    case DELETE_PRODUCTS: {
      return {
        ...state,
        deletedProducts: action.payload
      }
    }
    default:
      return state
  }
}
