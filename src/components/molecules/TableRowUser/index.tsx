import * as React from 'react'
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { DateTime } from 'luxon'
import {
  TableCell,
  TableRow as MuiTableRow,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@mui/material'

import { ListItemLink } from '../../atoms/ListItemLink'
import styles from './index.module.scss'
import { TableRowUserPropsType } from './index.types'

export const TableRowUser = ({
  row,
  selecteds,
  setSelecteds,
  handleRowCheckbox,
  isLoadingGetUsers,
  isLoadingDeleteUsers,
  setSelectedsDestroy
}: TableRowUserPropsType) => {
  const [rowCellAnchorEl, setRowCellAnchorEl] = React.useState<any | null>(null)

  const rowDateTimeString = DateTime.fromISO(row.createdAt).toFormat(
    'dd/MM/yyyy HH:mm'
  )

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  function handleRowToggleMenu(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setRowCellAnchorEl({ [row.id]: event.currentTarget })
    setSelecteds(null)
  }

  function handleRowMenuClose() {
    setRowCellAnchorEl(null)
  }

  function handleRowMenuDelete(id: number) {
    setSelectedsDestroy([id])
    handleRowMenuClose()
  }

  const isItemSelected = isSelected(row.id)
  const labelId = `enhanced-table-checkbox-${row.id}`
  const rowCellOpen = Boolean(rowCellAnchorEl)

  return (
    <MuiTableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      className={styles.container}
    >
      <TableCell className={styles.tdCheckbox}>
        <Checkbox
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          onClick={() => handleRowCheckbox(row.id)}
          disabled={isLoadingGetUsers || isLoadingDeleteUsers}
        />
      </TableCell>
      <TableCell>
        <Link href={`/usuarios/${row.id}`} className={styles.aEdit}>
          {row.name}
        </Link>
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{rowDateTimeString}</TableCell>
      <TableCell>
        <IconButton
          id="rowCellBasicButton"
          aria-controls={rowCellOpen ? 'rowCellBasicMenu' : undefined}
          aria-haspopup="true"
          aria-expanded={rowCellOpen ? 'true' : undefined}
          onClick={e => handleRowToggleMenu(e)}
          disabled={isLoadingGetUsers || isLoadingDeleteUsers}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="rowCellBasicMenu"
          anchorEl={rowCellAnchorEl && rowCellAnchorEl[row.id]}
          open={Boolean(rowCellAnchorEl && rowCellAnchorEl[row.id])}
          onClose={handleRowMenuClose}
          MenuListProps={{
            'aria-labelledby': 'rowCellBasicButton'
          }}
          className={styles.tableRowCellMenu}
        >
          <MenuItem
            onClick={() => handleRowMenuDelete(row.id)}
            className={styles.itemDelete}
          >
            <ListItemIcon>
              <DeleteIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.text}>Deletar</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemLink
              to={`/usuarios/${row.id}`}
              primary="Editar"
              icon={<EditIcon className={styles.iconEdit} />}
            />
          </MenuItem>
        </Menu>
      </TableCell>
    </MuiTableRow>
  )
}
