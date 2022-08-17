import { AxiosResponse } from 'axios'

import { api } from './api'

export const casesService = { getCases }

async function getCases(): Promise<AxiosResponse> {
  return await api.get('/cases/list')
}
