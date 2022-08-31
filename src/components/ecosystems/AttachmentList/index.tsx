import * as React from 'react'
import { Paper, TablePagination } from '@mui/material'

import { AttachmentListModal } from '../../molecules/AttachmentListModal'
import {
  useAppSelector,
  reduxAttachmentsGetAttachmentListFunction,
  reduxAttachmentsDeleteAttachmentListFunction,
  useAppDispatch,
  AttachmentData
} from '../../../redux'
import { AttachmentTableTopbar } from '../../molecules/AttachmentTableTopbar'
import { AttachmentCardImage } from '../../molecules/AttachmentCardImage'
import styles from './index.module.scss'

export const AttachmentList = () => {
  const { getAttachmentListAttachments, getAttachmentListTotal } =
    useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()

  const [gridItems, setGridItems] = React.useState<AttachmentData[] | null>(
    null
  )
  const [onGetAttachmentList, setOnGetAttachmentList] = React.useState(true)
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [isLoadingGetAttachmentList, setIsLoadingGetAttachmentList] =
    React.useState(false)
  const [loadingDeleteAttachmentList, setLoadingDeleteAttachmentList] =
    React.useState(false)
  const [attachmentModalId, setAttachmentModalId] = React.useState<
    number | null
  >(null)
  const [onSetGrid, setOnSetGrid] = React.useState(false)
  const [countAllRows, setCountAllRows] = React.useState(0)
  const [pageQuery, setPageQuery] = React.useState(1)
  const [pageRows, setPageRows] = React.useState(0)
  const [perPageRows, setPerPageRows] = React.useState(50)
  const [attachmentsHaveBeenDeleted, setAttachmentsHaveBeenDeleted] =
    React.useState(false)

  const attachmentModal =
    getAttachmentListAttachments?.find(item => item.id === attachmentModalId) ??
    null

  function setGrid() {
    setOnSetGrid(false)
    if (getAttachmentListAttachments) {
      if (!getAttachmentListTotal) return
      setGridItems(
        getAttachmentListAttachments.slice(
          pageRows * perPageRows,
          pageRows * perPageRows +
            (perPageRows === -1 ? getAttachmentListTotal : perPageRows)
        )
      )
    } else {
      setGridItems(null)
    }
    setCountAllRows(getAttachmentListTotal ?? 0)
  }

  function resetGrid() {
    setPageQuery(1)
    setPageRows(0)
    setSelecteds(null)
    setAttachmentsHaveBeenDeleted(false)
    setOnGetAttachmentList(true)
  }

  function handleChangeRowsPerPage(thePerPage: number) {
    setPerPageRows(thePerPage)
    resetGrid()
  }

  function handleChangePage(thePage: number) {
    setPageRows(thePage)
    if (thePage === pageQuery) {
      setPageQuery(page => page + 1)
      setOnGetAttachmentList(true)
    } else {
      setOnSetGrid(true)
    }
    setSelecteds(null)
  }

  async function getAttachmentList() {
    if (isLoadingGetAttachmentList) return
    setOnGetAttachmentList(false)

    setIsLoadingGetAttachmentList(true)
    await dispatch(
      reduxAttachmentsGetAttachmentListFunction({
        page: pageQuery,
        perPage: perPageRows
      })
    )
    setIsLoadingGetAttachmentList(false)
  }

  async function deleteAttachmentList() {
    if (loadingDeleteAttachmentList || !selecteds) return

    setLoadingDeleteAttachmentList(true)
    await dispatch(
      reduxAttachmentsDeleteAttachmentListFunction({
        attachmentsId: selecteds,
        setAttachmentsHaveBeenDeleted
      })
    )
    setLoadingDeleteAttachmentList(false)
  }

  React.useEffect(() => {
    if (!onGetAttachmentList) return
    getAttachmentList()
  }, [onGetAttachmentList])

  React.useEffect(() => {
    if (!getAttachmentListAttachments) return
    setGrid()
  }, [getAttachmentListAttachments])

  React.useEffect(() => {
    if (!onSetGrid) return
    setGrid()
  }, [onSetGrid])

  React.useEffect(() => {
    if (!attachmentsHaveBeenDeleted) return
    resetGrid()
  }, [attachmentsHaveBeenDeleted])

  console.log('selecteds', selecteds)

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <AttachmentTableTopbar
        numSelected={selecteds?.length ?? 0}
        loading={isLoadingGetAttachmentList || loadingDeleteAttachmentList}
        handleDeleteAllSelected={deleteAttachmentList}
        setSelecteds={setSelecteds}
        attachments={gridItems}
        setPage={setPageQuery}
        setIsOnGetAttachmentList={setOnGetAttachmentList}
        resetTable={resetGrid}
      />
      {gridItems ? (
        <>
          <div className={styles.grid}>
            {gridItems.map(attachment => (
              <AttachmentCardImage
                key={attachment.id}
                attachment={attachment}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                setAttachmentModalId={setAttachmentModalId}
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
          {attachmentModal && (
            <AttachmentListModal
              setAttachmentModalId={setAttachmentModalId}
              attachment={attachmentModal}
              attachmentsHaveBeenDeleted={attachmentsHaveBeenDeleted}
              setAttachmentsHaveBeenDeleted={setAttachmentsHaveBeenDeleted}
            />
          )}
        </>
      ) : (
        <p>Nenhum item de mídia encontrado.</p>
      )}
    </Paper>
  )
}
