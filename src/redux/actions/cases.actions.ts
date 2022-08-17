import { ActionCreator } from 'redux'

import { CaseData, CasesActionTypes, GET_CASES } from '../types'
import { casesService } from '../../services'

const getCasesSuccess: ActionCreator<CasesActionTypes> = (
  success: CaseData[]
) => {
  return { type: GET_CASES, payload: success }
}
const getCasesFailure: ActionCreator<CasesActionTypes> = () => {
  return { type: GET_CASES, payload: null }
}

export function getCases() {
  return async dispatch => {
    try {
      const { data } = await casesService.getCases()
      dispatch(getCasesSuccess(data?.success))
    } catch (err) {
      console.log(err)
      getCasesFailure()
    }
  }
}
