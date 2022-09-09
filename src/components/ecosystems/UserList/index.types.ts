import { GetUserListUserType } from '../../../redux/types'
import { OrderType } from '../../../utils'

export interface HeadCellType {
  id: keyof GetUserListUserType
  label: string
  numeric?: boolean
  noShort?: true
}

export interface EnhancedTablePropsType {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof GetUserListUserType
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: OrderType
  orderBy: string
  rowCount: number
}

export interface EnhancedTableToolbarPropsType {
  loading: boolean
  numSelected: number
  handleReloadTable(): void
  handleDeleteAllSelectedRows(): void
}
