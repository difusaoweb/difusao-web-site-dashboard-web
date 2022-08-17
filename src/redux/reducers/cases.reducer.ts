import { GET_CASES, CasesActionTypes, CasesState } from '../types'

const initialState: CasesState = {
  casesList: null
}

export function casesReducer(
  state: CasesState = initialState,
  action: CasesActionTypes
): CasesState {
  switch (action.type) {
    case GET_CASES: {
      return {
        ...state,
        casesList: action.payload ?? null
      }
    }
    default:
      return state
  }
}
