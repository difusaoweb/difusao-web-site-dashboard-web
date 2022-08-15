import { AxiosResponse } from 'axios'

import { api } from './api'

export const taxonomiesService = { getTaxonomies }

async function getTaxonomies(): Promise<AxiosResponse> {
  return await api.get('/taxonomies/list')
}
