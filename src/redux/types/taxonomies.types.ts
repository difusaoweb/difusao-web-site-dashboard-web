export interface TaxonomyData {
  id: number
  name: string
}

export const GET_TAXONOMIES = 'GET_TAXONOMIES'

interface GetTaxonomiesAction {
  type: typeof GET_TAXONOMIES
  payload: TaxonomyData[] | null
}

export interface TaxonomiesState {
  taxonomiesList: TaxonomyData[] | null
}

export type TaxonomiesActionTypes = GetTaxonomiesAction
