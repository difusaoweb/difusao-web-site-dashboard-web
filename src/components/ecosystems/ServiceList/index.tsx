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
  ServiceData,
  useAppSelector,
  reduxServicesGetServiceListFunction,
  reduxServicesDeleteServiceListFunction,
  useAppDispatch
} from '../../../redux'
import { TableRow } from '../../molecules/TableRow'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: typeof Key },
  b: { [key in Key]: typeof Key }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  id: keyof ServiceData
  label: string
  numeric?: boolean
  noShort?: true
}
const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    label: 'Imagem',
    noShort: true
  },
  {
    id: 'title',
    label: 'Título'
  },
  {
    id: 'description',
    label: 'Descrição'
  },
  {
    id: 'created_at',
    label: 'Data'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceData
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}
function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler =
    (property: keyof ServiceData) => (event: React.MouseEvent<unknown>) => {
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

interface EnhancedTableToolbarProps {
  loading: boolean
  numSelected: number
  handleReloadTable(): void
  handleDeleteAllSelectedRows(): void
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
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
          Serviços
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

export const ServiceList = () => {
  const {
    getServiceListServices,
    getServiceListTotal,
    deleteServiceListDeleted
  } = useAppSelector(state => state.services)
  const dispatch = useAppDispatch()

  const [isOnGetServiceList, setIsOnGetServiceList] = React.useState(true)
  const [isLoadingGetServiceList, setIsLoadingGetServiceList] =
    React.useState(false)
  const [isLoadingDeleteServiceList, setIsLoadingDeleteServiceList] =
    React.useState(false)
  const [rows, setRows] = React.useState<ServiceData[] | null>(null)
  const [countAllRows, setCountAllRows] = React.useState(0)
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof ServiceData>('created_at')
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [selectedsDestroy, setSelectedsDestroy] = React.useState<
    number[] | null
  >(null)
  const [pageQuery, setPageQuery] = React.useState(1)
  const [pageRows, setPageRows] = React.useState(0)
  const [perPageRows, setPerPageRows] = React.useState(50)
  const [isSetRowsTable, setIsSetRowsTable] = React.useState(false)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (rows) {
        const newSelecteds = rows.map(row => row.id)
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
    setIsOnGetServiceList(true)
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
      setIsOnGetServiceList(true)
    } else {
      setSelectedsDestroy(null)
      setIsSetRowsTable(true)
    }
    setSelecteds(null)
  }

  function handleChangeRowsPerPage(thePerPage: number) {
    setPerPageRows(thePerPage)
    setPageRows(0)
    setPageQuery(1)
    setSelecteds(null)
    setIsOnGetServiceList(true)
  }

  function setRowsTable() {
    setIsSetRowsTable(false)
    if (getServiceListServices) {
      if (!getServiceListTotal) return
      setRows(
        getServiceListServices.slice(
          pageRows * perPageRows,
          pageRows * perPageRows +
            (perPageRows === -1 ? getServiceListTotal : perPageRows)
        )
      )
    } else {
      setRows(null)
    }
    setCountAllRows(getServiceListTotal ?? 0)
  }

  async function onGetServiceList() {
    if (isLoadingGetServiceList) return
    setIsOnGetServiceList(false)

    setIsLoadingGetServiceList(true)
    await dispatch(
      reduxServicesGetServiceListFunction({
        page: pageQuery,
        perPage: perPageRows
      })
    )
    setIsLoadingGetServiceList(false)
  }

  async function onDeleteServiceList() {
    if (isLoadingDeleteServiceList || !selectedsDestroy) return

    setIsLoadingDeleteServiceList(true)
    await dispatch(
      reduxServicesDeleteServiceListFunction({ servicesId: selectedsDestroy })
    )
    setIsLoadingDeleteServiceList(false)
  }

  // Get initial services list
  React.useEffect(() => {
    if (!isOnGetServiceList) return
    onGetServiceList()
  }, [isOnGetServiceList])

  // Set rows where getServiceListServices is change and not null
  React.useEffect(() => {
    if (!getServiceListServices) return
    setRowsTable()
  }, [getServiceListServices])
  React.useEffect(() => {
    if (!isSetRowsTable) return
    setRowsTable()
  }, [isSetRowsTable])

  React.useEffect(() => {
    if (!selectedsDestroy) return
    onDeleteServiceList()
  }, [selectedsDestroy])

  React.useEffect(() => {
    if (!deleteServiceListDeleted) return
    resetTable()
  }, [deleteServiceListDeleted])

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selecteds?.length ?? 0}
          loading={isLoadingGetServiceList || isLoadingDeleteServiceList}
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
              rowCount={rows?.length ?? 0}
            />
            {rows ? (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(row => (
                  <TableRow
                    key={row.id}
                    row={row}
                    selecteds={selecteds}
                    setSelecteds={setSelecteds}
                    handleRowCheckbox={handleRowCheckbox}
                    isLoadingGetServiceList={isLoadingGetServiceList}
                    isLoadingDeleteServiceList={isLoadingDeleteServiceList}
                    setSelectedsDestroy={setSelectedsDestroy}
                  />
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <MuiTableRow>
                  <TableCell colSpan={999}>
                    Nenhum serviço encontrado.
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
          // labelDisplayedRows={({ from, to, count }) => {
          //   return `${from}–${to} of ${
          //     count !== -1 ? count : `more than ${to}`
          //   }`
          // }}
        />
      </Paper>
    </>
  )
}
