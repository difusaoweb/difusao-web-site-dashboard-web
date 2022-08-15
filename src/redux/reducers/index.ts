import { combineReducers } from 'redux'

import { alertsReducer } from './alerts.reducer'
import { accessReducer } from './access.reducer'
import { usersReducer } from './users.reducer'
import { taxonomiesReducer } from './taxonomies.reducer'
import { productsReducer } from './products.reducer'

export const rootReducer = combineReducers({
  alerts: alertsReducer,
  access: accessReducer,
  users: usersReducer,
  taxonomies: taxonomiesReducer,
  products: productsReducer
})
