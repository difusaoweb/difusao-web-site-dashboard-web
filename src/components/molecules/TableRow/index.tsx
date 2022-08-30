import * as React from 'react'
import { useTheme } from '@mui/material/styles'
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
  Avatar,
  Link
} from '@mui/material'

import { ListItemLink } from '../../atoms/ListItemLink'
import { ServiceData } from '../../../redux'
import styles from './index.module.scss'

interface TableRowProps {
  row: ServiceData
  selecteds: number[] | null
  setSelecteds(id: number[] | null): void
  handleRowCheckbox(id: number): void
  isLoadingGetServiceList: boolean
  isLoadingDeleteServiceList: boolean
  setSelectedsDestroy(id: number[]): void
}
export const TableRow = ({
  row,
  selecteds,
  setSelecteds,
  handleRowCheckbox,
  isLoadingGetServiceList,
  isLoadingDeleteServiceList,
  setSelectedsDestroy
}: TableRowProps) => {
  const theme = useTheme()

  const [rowCellAnchorEl, setRowCellAnchorEl] = React.useState<any | null>(null)

  const rowDateTimeString = DateTime.fromISO(row.created_at).toFormat(
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
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          onClick={() => handleRowCheckbox(row.id)}
          disabled={isLoadingGetServiceList || isLoadingDeleteServiceList}
        />
      </TableCell>
      <TableCell>
        <Avatar
          alt={row.title}
          src={row.image}
          variant="rounded"
          sx={{ width: 100, height: 100 }}
        />
      </TableCell>
      <TableCell align="left">
        <Link
          href={`/servicos/${row.id}`}
          sx={{
            color: 'unset',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {row.title} - {row.id}
        </Link>
      </TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="left">{rowDateTimeString}</TableCell>
      <TableCell>
        <IconButton
          id="rowCellBasicButton"
          aria-controls={rowCellOpen ? 'rowCellBasicMenu' : undefined}
          aria-haspopup="true"
          aria-expanded={rowCellOpen ? 'true' : undefined}
          onClick={e => handleRowToggleMenu(e)}
          disabled={isLoadingGetServiceList || isLoadingDeleteServiceList}
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
        >
          <MenuItem onClick={() => handleRowMenuDelete(row.id)}>
            <ListItemIcon>
              <DeleteIcon
                fontSize="small"
                sx={{ color: theme.palette.error.main }}
              />
            </ListItemIcon>
            <ListItemText sx={{ color: theme.palette.error.main }}>
              Deletar
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemLink
              to={`/servicos/${row.id}`}
              primary="Editar"
              icon={<EditIcon fontSize="small" />}
            />
          </MenuItem>
        </Menu>
      </TableCell>
    </MuiTableRow>
  )
}
