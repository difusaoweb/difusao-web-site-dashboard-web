import { combineReducers } from 'redux'

import { alertsReducer } from './alerts.reducer'
import { accessReducer } from './access.reducer'
import { usersReducer } from './users.reducer'
import { attachmentsReducer } from './attachments.reducer'
import { servicesReducer } from './services.reducer'
import { casesReducer } from './cases.reducer'

export const rootReducer = combineReducers({
  alerts: alertsReducer,
  access: accessReducer,
  users: usersReducer,
  attachments: attachmentsReducer,
  services: servicesReducer,
  cases: casesReducer
})
