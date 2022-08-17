import * as React from 'react'

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'

const ServiceTableRowMenu = () => {
  return (
    <Menu
      id="rowCellBasicMenu"
      anchorEl={rowCellAnchorEl}
      open={rowCellOpen}
      onClose={handleRowCellClose}
      MenuListProps={{
        'aria-labelledby': 'rowCellBasicButton'
      }}
    >
      <p>{rowId}</p>
      <MenuItem
        onClick={() => handleRowCellDelete([rowId])}
        sx={{ color: '#f00' }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Deletar{rowId}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleRowCellEdit(rowId)}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Editar{rowId}</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ServiceTableRowMenu
