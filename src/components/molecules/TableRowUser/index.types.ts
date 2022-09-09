import { GetUserListUserType } from '../../../redux/types'

export interface TableRowUserPropsType {
  row: GetUserListUserType
  selecteds: number[] | null
  setSelecteds(id: number[] | null): void
  handleRowCheckbox(id: number): void
  isLoadingGetUsers: boolean
  isLoadingDeleteUsers: boolean
  setSelectedsDestroy(id: number[]): void
}
