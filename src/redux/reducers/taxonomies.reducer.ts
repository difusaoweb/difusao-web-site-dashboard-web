import {
  GET_TAXONOMIES,
  TaxonomiesActionTypes,
  TaxonomiesState
} from '../types'

const initialState: TaxonomiesState = {
  taxonomiesList: null
}

export function taxonomiesReducer(
  state: TaxonomiesState = initialState,
  action: TaxonomiesActionTypes
): TaxonomiesState {
  switch (action.type) {
    case GET_TAXONOMIES: {
      return {
        ...state,
        taxonomiesList: action.payload ?? null
      }
    }
    default:
      return state
  }
}
