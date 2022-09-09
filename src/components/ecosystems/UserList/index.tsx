import * as React from 'react'
import { alpha } from '@mui/material/styles'
import { Replay as ReplayIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow as MuiTableRow,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Toolbar,
  TableHead,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  CircularProgress,
  Tooltip
} from '@mui/material'

import {
  GetUserListUserType,
  useAppSelector,
  reduxUsersGetUserListFunction,
  reduxUsersDeleteUserListFunction,
  useAppDispatch
} from '../../../redux'
import { TableRowUser } from '../../molecules/TableRowUser'
import { stableSort, getComparator, OrderType } from '../../../utils'
import {
  HeadCellType,
  EnhancedTablePropsType,
  EnhancedTableToolbarPropsType
} from './index.types'

const headCells: readonly HeadCellType[] = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'createdAt',
    label: 'Data'
  }
]

const EnhancedTableHead = (props: EnhancedTablePropsType) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler =
    (property: keyof GetUserListUserType) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <MuiTableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.noShort ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </MuiTableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarPropsType) => {
  const {
    loading,
    numSelected,
    handleReloadTable,
    handleDeleteAllSelectedRows
  } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuários
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeleteAllSelectedRows()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Recarregar lista">
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={handleReloadTable}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}

export const UserList = () => {
  const { getUserListUsers, getUserListTotal } = useAppSelector(
    state => state.users
  )
  const dispatch = useAppDispatch()

  const [tableItems, setTableItems] = React.useState<
    GetUserListUserType[] | null
  >(null)
  const [isLoadingGetUserList, setIsLoadingGetUserList] = React.useState(false)
  const [isLoadingDeleteUserList, setIsLoadingDeleteUserList] =
    React.useState(false)
  const [countAllRows, setCountAllRows] = React.useState(0)
  const [order, setOrder] = React.useState<OrderType>('desc')
  const [orderBy, setOrderBy] =
    React.useState<keyof GetUserListUserType>('createdAt')
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [selectedsDestroy, setSelectedsDestroy] = React.useState<
    number[] | null
  >(null)
  const [pageQuery, setPageQuery] = React.useState(1)
  const [pageRows, setPageRows] = React.useState(0)
  const [perPageRows, setPerPageRows] = React.useState(50)
  const [usersHaveBeenDeleted, setUsersHaveBeenDeleted] = React.useState(false)
  const [onGetUserList, setOnGetUserList] = React.useState(true)
  const [onSetTable, setOnSetTable] = React.useState(false)

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof GetUserListUserType
  ) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      if (tableItems) {
        const newSelecteds = tableItems.map(tableItem => tableItem.id)
        setSelecteds(newSelecteds)
      }
      return
    }
    setSelecteds(null)
  }

  function resetTable() {
    setPageQuery(1)
    setPageRows(0)
    setSelecteds(null)
    setSelectedsDestroy(null)
    setOnGetUserList(true)
  }

  function handleReloadTable() {
    resetTable()
  }

  function handleDeleteAllSelectedRows() {
    setSelectedsDestroy(selecteds)
  }

  function handleRowCheckbox(id: number) {
    if (selecteds) {
      const selectedIndex = selecteds.indexOf(id)
      let newSelecteds: number[] = []

      if (selectedIndex === -1) {
        newSelecteds = newSelecteds.concat(selecteds, id)
      } else if (selectedIndex === 0) {
        newSelecteds = newSelecteds.concat(selecteds.slice(1))
      } else if (selectedIndex === selecteds.length - 1) {
        newSelecteds = newSelecteds.concat(selecteds.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelecteds = newSelecteds.concat(
          selecteds.slice(0, selectedIndex),
          selecteds.slice(selectedIndex + 1)
        )
      }
      setSelecteds(newSelecteds)
    } else {
      setSelecteds([id])
    }
  }

  function handleChangePage(thePage: number) {
    setPageRows(thePage)
    if (thePage === pageQuery) {
      setPageQuery(page => page + 1)
      setOnGetUserList(true)
    } else {
      setOnSetTable(true)
    }
    setSelecteds(null)
  }

  function handleChangeRowsPerPage(thePerPage: number) {
    setPerPageRows(thePerPage)
    setPageRows(0)
    setPageQuery(1)
    setSelecteds(null)
    setOnGetUserList(true)
  }

  function setTable() {
    setOnSetTable(false)
    if (getUserListUsers) {
      if (!getUserListTotal) return
      setTableItems(
        getUserListUsers.slice(
          pageRows * perPageRows,
          pageRows * perPageRows +
            (perPageRows === -1 ? getUserListTotal : perPageRows)
        )
      )
    } else {
      setTableItems(null)
    }
    setCountAllRows(getUserListTotal ?? 0)
  }

  function resetGrid() {
    setPageQuery(1)
    setPageRows(0)
    setSelecteds(null)
    setUsersHaveBeenDeleted(false)
    setOnGetUserList(true)
  }

  async function getUserList() {
    if (isLoadingGetUserList) return
    setOnGetUserList(false)

    setIsLoadingGetUserList(true)
    await dispatch(
      reduxUsersGetUserListFunction({
        page: pageQuery,
        perPage: perPageRows
      })
    )
    setIsLoadingGetUserList(false)
  }

  async function onDeleteUserList() {
    if (isLoadingDeleteUserList || !selectedsDestroy) return

    setIsLoadingDeleteUserList(true)
    await dispatch(
      reduxUsersDeleteUserListFunction({
        usersId: selectedsDestroy,
        setUsersHaveBeenDeleted
      })
    )
    setIsLoadingDeleteUserList(false)
  }

  React.useEffect(() => {
    if (!onGetUserList) return
    getUserList()
  }, [onGetUserList])
  React.useEffect(() => {
    if (!getUserListUsers) return
    setTable()
  }, [getUserListUsers])

  React.useEffect(() => {
    if (!onSetTable) return
    setTable()
  }, [onSetTable])

  React.useEffect(() => {
    if (!selectedsDestroy) return
    onDeleteUserList()
  }, [selectedsDestroy])
  React.useEffect(() => {
    if (!usersHaveBeenDeleted) return
    resetGrid()
  }, [usersHaveBeenDeleted])

  console.log('getUserListUsers', getUserListUsers)

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selecteds?.length ?? 0}
          loading={isLoadingGetUserList || isLoadingDeleteUserList}
          handleReloadTable={handleReloadTable}
          handleDeleteAllSelectedRows={handleDeleteAllSelectedRows}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selecteds?.length ?? 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableItems?.length ?? 0}
            />
            {tableItems ? (
              <TableBody>
                {stableSort(tableItems, getComparator(order, orderBy)).map(
                  row => (
                    <TableRowUser
                      key={row.id}
                      row={row}
                      selecteds={selecteds}
                      setSelecteds={setSelecteds}
                      handleRowCheckbox={handleRowCheckbox}
                      isLoadingGetUsers={isLoadingGetUserList}
                      isLoadingDeleteUsers={isLoadingDeleteUserList}
                      setSelectedsDestroy={setSelectedsDestroy}
                    />
                  )
                )}
              </TableBody>
            ) : (
              <TableBody>
                <MuiTableRow>
                  <TableCell colSpan={999}>
                    Nenhum usuários encontrado.
                  </TableCell>
                </MuiTableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'Todos' }]}
          component="div"
          page={pageRows}
          rowsPerPage={perPageRows}
          count={countAllRows}
          onPageChange={(e, page) => handleChangePage(page)}
          onRowsPerPageChange={e =>
            handleChangeRowsPerPage(Number(e.target.value))
          }
          labelRowsPerPage="Linhas por páginas:"
        />
      </Paper>
    </>
  )
}
