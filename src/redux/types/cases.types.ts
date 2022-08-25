import { NumberOrNull, BooleanOrNull, ErrorStatusOrNull } from './common.types'

export interface CaseData {
  id: number
  image: string
  title: string
  description: string
  created_at: string
}
export interface ReduxCasesGetCaseListServiceParameters {
  page: number
  perPage: number
}
export interface ReduxCasesGetCaseListReducerPayload {
  success: {
    cases: CaseData[]
    currentPage: number
    lastPage: number
    total: number
  } | null
  failure: ErrorStatusOrNull
}
export type ReduxCasesGetCaseListFunctionDispatch = ReturnType<
  typeof CaseActionTypes | typeof AlertActionTypes
>

export interface ReduxCasesDeleteCaseListServiceParameters {
  casesId: number[]
}
export interface ReduxCasesDeleteCaseListReducerPayload {
  success: {
    deleted: boolean
    casesId: number[]
  } | null
  failure: ErrorStatusOrNull
}
export type ReduxCasesDeleteCaseListFunctionDispatch = ReturnType<
  typeof CaseActionTypes | typeof AlertActionTypes
>

export interface ReduxCasesCreateCaseServiceParameters {
  title: string
  description: string
  image: number
}
export interface ReduxCasesCreateCaseReducerPayload {
  success: {
    caseId: number
  } | null
  failure: ErrorStatusOrNull
}
export type ReduxCasesCreateCaseFunctionDispatch = ReturnType<
  typeof CaseActionTypes | typeof AlertActionTypes
>

export const REDUX_CASES_GET_CASE_LIST = 'REDUX_CASES_GET_CASE_LIST'
interface ReduxCasesGetCaseListReducer {
  type: typeof REDUX_CASES_GET_CASE_LIST
  payload: ReduxCasesGetCaseListReducerPayload
}

export const REDUX_CASES_DELETE_CASE_LIST = 'REDUX_CASES_DELETE_CASE_LIST'
interface ReduxCasesDeleteCaseListReducer {
  type: typeof REDUX_CASES_DELETE_CASE_LIST
  payload: ReduxCasesDeleteCaseListReducerPayload
}

export const REDUX_CASES_CREATE_CASE = 'REDUX_CASES_CREATE_CASE'
interface ReduxCasesCreateCaseReducer {
  type: typeof REDUX_CASES_CREATE_CASE
  payload: ReduxCasesCreateCaseReducerPayload
}

export interface CaseState {
  getCaseListCases: CaseData[] | null
  getCaseListLastPage: NumberOrNull
  getCaseListTotal: NumberOrNull
  getCaseListError: ErrorStatusOrNull

  deleteCaseListDeleted: BooleanOrNull
  deleteCaseListError: ErrorStatusOrNull

  createCaseCaseId: NumberOrNull
  createCaseError: ErrorStatusOrNull
}

export type CaseActionTypes =
  | ReduxCasesGetCaseListReducer
  | ReduxCasesDeleteCaseListReducer
  | ReduxCasesCreateCaseReducer
