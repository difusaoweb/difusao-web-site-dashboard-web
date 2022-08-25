import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  CaseActionTypes,
  ReduxCasesGetCaseListReducerPayload,
  REDUX_CASES_GET_CASE_LIST,
  ReduxCasesGetCaseListCaseParameters,
  ReduxCasesGetCaseListFunctionDispatch,
  ReduxCasesDeleteCaseListReducerPayload,
  REDUX_CASES_DELETE_CASE_LIST,
  ReduxCasesDeleteCaseListCaseParameters,
  ReduxCasesDeleteCaseListFunctionDispatch,
  ReduxCasesCreateCaseReducerPayload,
  REDUX_CASES_CREATE_CASE,
  ReduxCasesCreateCaseCaseParameters,
  ReduxCasesCreateCaseFunctionDispatch
} from '../types'
import { casesService } from '../../services'
import { reduxAlertsSetAlertFunction } from './alerts.actions'

const reduxCasesGetCaseListAction: ActionCreator<CaseActionTypes> = (
  payload: ReduxCasesGetCaseListReducerPayload
) => {
  return { type: REDUX_CASES_GET_CASE_LIST, payload }
}
export function reduxCasesGetCaseListFunction({
  page,
  perPage
}: ReduxCasesGetCaseListCaseParameters) {
  return async (dispatch: Dispatch<ReduxCasesGetCaseListFunctionDispatch>) => {
    try {
      const { data } = await casesService.getCaseList({ page, perPage })
      const cases = data?.success?.cases
      const lastPage = data?.success?.last_page
      const total = data?.success?.total

      dispatch(
        reduxCasesGetCaseListAction({
          success: { cases, lastPage, currentPage: page, total },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          break
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxCasesGetCaseListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxCasesDeleteCaseListAction: ActionCreator<CaseActionTypes> = (
  payload: ReduxCasesDeleteCaseListReducerPayload
) => {
  return { type: REDUX_CASES_DELETE_CASE_LIST, payload }
}
export function reduxCasesDeleteCaseListFunction({
  casesId
}: ReduxCasesDeleteCaseListCaseParameters) {
  return async (
    dispatch: Dispatch<ReduxCasesDeleteCaseListFunctionDispatch>
  ) => {
    try {
      const { data } = await casesService.deleteCaseList({ casesId })
      const deleted = data?.success?.deleted

      dispatch(
        reduxCasesDeleteCaseListAction({
          success: { deleted, casesId },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxCasesDeleteCaseListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxCasesCreateCaseAction: ActionCreator<CaseActionTypes> = (
  payload: ReduxCasesCreateCaseReducerPayload
) => {
  return { type: REDUX_CASES_CREATE_CASE, payload }
}
export function reduxCasesCreateCaseFunction(
  parameters: ReduxCasesCreateCaseCaseParameters
) {
  return async (dispatch: Dispatch<ReduxCasesCreateCaseFunctionDispatch>) => {
    try {
      const { data } = await casesService.createCase(parameters)
      const caseId = data?.success?.case_id

      dispatch(
        reduxCasesCreateCaseAction({
          success: { caseId },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
          break
      }

      dispatch(
        reduxCasesCreateCaseAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}
