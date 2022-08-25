import {
  CaseState,
  CaseActionTypes,
  REDUX_CASES_GET_CASE_LIST,
  REDUX_CASES_DELETE_CASE_LIST,
  REDUX_CASES_CREATE_CASE
} from '../types'

const initialState: CaseState = {
  getCaseListCases: null,
  getCaseListLastPage: null,
  getCaseListTotal: null,
  getCaseListError: null,
  deleteCaseListDeleted: null,
  deleteCaseListError: null,
  createCaseCaseId: null,
  createCaseError: null
}

export function casesReducer(
  state: CaseState = initialState,
  action: CaseActionTypes
): CaseState {
  switch (action.type) {
    case REDUX_CASES_GET_CASE_LIST: {
      let getCaseListCases = state.getCaseListCases
      if (action.payload.success) {
        const { currentPage, cases } = action.payload.success

        if (getCaseListCases) {
          if (currentPage === 1) {
            getCaseListCases = cases
          } else {
            getCaseListCases = [...getCaseListCases, ...cases]
          }
        } else {
          getCaseListCases = cases
        }
      }
      return {
        ...state,
        getCaseListCases,
        getCaseListLastPage: action.payload.success?.lastPage ?? null,
        getCaseListTotal: action.payload.success?.total ?? null,
        getCaseListError: action.payload.failure
      }
    }
    case REDUX_CASES_DELETE_CASE_LIST: {
      return {
        ...state,
        deleteCaseListDeleted: action.payload.success?.deleted ?? null,
        deleteCaseListError: action.payload.failure
      }
    }
    case REDUX_CASES_CREATE_CASE: {
      return {
        ...state,
        createCaseCaseId: action.payload.success?.caseId ?? null,
        createCaseError: action.payload.failure
      }
    }
    default:
      return state
  }
}
