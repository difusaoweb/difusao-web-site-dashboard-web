import { ActionCreator } from 'redux'

import { TaxonomyData, TaxonomiesActionTypes, GET_TAXONOMIES } from '../types'
import { taxonomiesService } from '../../services'

const getTaxonomiesSuccess: ActionCreator<TaxonomiesActionTypes> = (
  success: TaxonomyData[]
) => {
  return { type: GET_TAXONOMIES, payload: success }
}
const getTaxonomiesFailure: ActionCreator<TaxonomiesActionTypes> = () => {
  return { type: GET_TAXONOMIES, payload: null }
}

export function getTaxonomies() {
  return async dispatch => {
    try {
      const { data } = await taxonomiesService.getTaxonomies()
      dispatch(getTaxonomiesSuccess(data?.success))
    } catch (err) {
      console.log(err)
      getTaxonomiesFailure()
    }
  }
}
