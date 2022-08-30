import * as React from 'react'
import { Paper, TablePagination } from '@mui/material'

import { ModalImage } from '../../molecules/ModalImage'
import {
  useAppSelector,
  reduxAttachmentsGetAttachmentListFunction,
  reduxAttachmentsDeleteAttachmentListFunction,
  useAppDispatch,
  AttachmentData
} from '../../../redux'
import { Loading } from '../../atoms/Loading'
import { AttachmentTableTopbar } from '../../molecules/AttachmentTableTopbar'
import { AttachmentCardImage } from '../../molecules/AttachmentCardImage'
import styles from './index.module.scss'

export const AttachmentList = () => {
  const {
    getAttachmentListAttachments,
    getAttachmentListLastPage,
    getAttachmentListTotal,
    deleteAttachmentListDeleted,
    deleteAttachmentListError
  } = useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()

  const [rows, setRows] = React.useState<AttachmentData[] | null>(null)
  const [isOnGetAttachmentList, setIsOnGetAttachmentList] = React.useState(true)
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [isLoadingGetAttachmentList, setIsLoadingGetAttachmentList] =
    React.useState(false)
  const [isLoadingDeleteAttachmentList, setIsLoadingDeleteAttachmentList] =
    React.useState(false)
  const [idImageOpenModal, setIdImageOpenModal] = React.useState<number | null>(
    null
  )
  const [selectedsDestroy, setSelectedsDestroy] = React.useState<
    number[] | null
  >(null)
  const [isSetRowsTable, setIsSetRowsTable] = React.useState(false)
  const [countAllRows, setCountAllRows] = React.useState(0)
  const [pageQuery, setPageQuery] = React.useState(1)
  const [pageRows, setPageRows] = React.useState(0)
  const [perPageRows, setPerPageRows] = React.useState(50)

  function handleChangePage(thePage: number) {
    setPageRows(thePage)
    if (thePage === pageQuery) {
      setPageQuery(page => page + 1)
      setIsOnGetAttachmentList(true)
    } else {
      setSelectedsDestroy(null)
      setIsSetRowsTable(true)
    }
    setSelecteds(null)
  }

  function setRowsTable() {
    setIsSetRowsTable(false)
    if (getAttachmentListAttachments) {
      if (!getAttachmentListTotal) return
      setRows(
        getAttachmentListAttachments.slice(
          pageRows * perPageRows,
          pageRows * perPageRows +
            (perPageRows === -1 ? getAttachmentListTotal : perPageRows)
        )
      )
    } else {
      setRows(null)
    }
    setCountAllRows(getAttachmentListTotal ?? 0)
  }

  function handleChangeRowsPerPage(thePerPage: number) {
    setPerPageRows(thePerPage)
    setPageRows(0)
    setPageQuery(1)
    setSelecteds(null)
    setSelectedsDestroy(null)
    setIsOnGetAttachmentList(true)
  }

  function resetTable() {
    setPageQuery(1)
    setPageRows(0)
    setSelecteds(null)
    setSelectedsDestroy(null)
    setIsOnGetAttachmentList(true)
  }

  const attachmentModal =
    getAttachmentListAttachments?.find(item => item.id === idImageOpenModal) ??
    null

  async function onGetAttachmentList() {
    if (isLoadingGetAttachmentList) return
    setIsOnGetAttachmentList(false)

    setIsLoadingGetAttachmentList(true)
    await dispatch(
      reduxAttachmentsGetAttachmentListFunction({
        page: pageQuery,
        perPage: perPageRows
      })
    )
    setIsLoadingGetAttachmentList(false)
  }

  async function onDeleteAttachmentList() {
    if (isLoadingDeleteAttachmentList || !selecteds) return

    setIsLoadingDeleteAttachmentList(true)
    await dispatch(
      reduxAttachmentsDeleteAttachmentListFunction({
        attachmentsId: selecteds
      })
    )
    setIsLoadingDeleteAttachmentList(false)
  }

  React.useEffect(() => {
    if (!isOnGetAttachmentList) return
    onGetAttachmentList()
  }, [isOnGetAttachmentList])

  React.useEffect(() => {
    if (!getAttachmentListAttachments) return
    setRowsTable()
  }, [getAttachmentListAttachments])
  React.useEffect(() => {
    if (!isSetRowsTable) return
    setRowsTable()
  }, [isSetRowsTable])

  React.useEffect(() => {
    if (!selectedsDestroy) return
    onDeleteAttachmentList()
  }, [selectedsDestroy])

  React.useEffect(() => {
    if (!deleteAttachmentListDeleted) return
    resetTable()
  }, [deleteAttachmentListDeleted])

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <AttachmentTableTopbar
        numSelected={selecteds?.length ?? 0}
        loading={isLoadingGetAttachmentList || isLoadingDeleteAttachmentList}
        handleDeleteAllSelected={onDeleteAttachmentList}
        setSelecteds={setSelecteds}
        attachments={rows}
        setPage={setPageQuery}
        setIsOnGetAttachmentList={setIsOnGetAttachmentList}
        resetTable={resetTable}
      />
      {rows ? (
        <>
          <div className={styles.grid}>
            {rows.map(attachment => (
              <AttachmentCardImage
                key={attachment.id}
                attachment={attachment}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                setIdImageOpenModal={setIdImageOpenModal}
              />
            ))}
          </div>
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
          {idImageOpenModal && attachmentModal && (
            <ModalImage
              idImageOpenModal={idImageOpenModal}
              setIdImageOpenModal={setIdImageOpenModal}
              attachment={attachmentModal}
            />
          )}
        </>
      ) : (
        <p>Nenhum item de mídia encontrado.</p>
      )}
    </Paper>
  )
}
