export interface CaseData {
  id: number
  name: string
}

export const GET_CASES = 'GET_CASES'

interface GetCasesAction {
  type: typeof GET_CASES
  payload: CaseData[] | null
}

export interface CasesState {
  casesList: CaseData[] | null
}

export type CasesActionTypes = GetCasesAction
