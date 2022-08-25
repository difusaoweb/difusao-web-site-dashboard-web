import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxCasesGetCaseListServiceParameters,
  ReduxCasesDeleteCaseListServiceParameters,
  ReduxCasesCreateCaseServiceParameters
} from '../redux'

async function getCaseList({
  page,
  perPage
}: ReduxCasesGetCaseListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/cases/list', {
    params: { page, per_page: perPage }
  })
}

async function deleteCaseList({
  casesId
}: ReduxCasesDeleteCaseListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/cases/delete', {
    params: { cases_id: casesId }
  })
}

async function createCase({
  title,
  description,
  image
}: ReduxCasesCreateCaseServiceParameters): Promise<AxiosResponse> {
  return await api.get('/cases/create', {
    params: {
      title,
      description,
      image
    }
  })
}

export const casesService = {
  getCaseList,
  deleteCaseList,
  createCase
}
