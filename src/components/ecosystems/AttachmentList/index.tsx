import * as React from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import {
  ImageListItem,
  ImageListItemBar,
  Checkbox,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress
} from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Replay as ReplayIcon, Delete as DeleteIcon } from '@mui/icons-material'

import { ModalImage } from '../../molecules/ModalImage'
import {
  useAppSelector,
  reduxAttachmentsGetAttachmentListFunction,
  reduxAttachmentsDeleteAttachmentListFunction,
  useAppDispatch
} from '../../../redux'
import { Loading } from '../../atoms/Loading'

interface EnhancedTableToolbarProps {
  loading: boolean
  numSelected: number
  handleReloadCard(): void
  handleDeleteAllSelected(): void
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { loading, numSelected, handleReloadCard, handleDeleteAllSelected } =
    props

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
          Mídias
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Deletar">
          <IconButton onClick={handleDeleteAllSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Recarregar lista">
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={handleReloadCard}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}

export const AttachmentList = () => {
  const { getAttachmentListAttachments, getAttachmentListLastPage } =
    useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const [isOnGetAttachmentList, setIsOnGetAttachmentList] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(50)
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [isLoadingGetAttachmentList, setIsLoadingGetAttachmentList] =
    React.useState(false)
  const [isLoadingDeleteAttachmentList, setIsLoadingDeleteAttachmentList] =
    React.useState(false)
  const [idImageOpenModal, setIdImageOpenModal] = React.useState<number | null>(
    null
  )

  const attachmentModal =
    getAttachmentListAttachments?.find(item => item.id === idImageOpenModal) ??
    null

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  function handleToggleCheckbox(id: number) {
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

  function handleReloadCard() {
    console.log('handleReloadCard')
    setPage(1)
    setSelecteds(null)
    setIsOnGetAttachmentList(true)
  }

  async function onGetAttachmentList() {
    if (isLoadingGetAttachmentList) return
    setIsOnGetAttachmentList(false)

    setIsLoadingGetAttachmentList(true)
    await dispatch(reduxAttachmentsGetAttachmentListFunction({ page, perPage }))
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

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selecteds?.length ?? 0}
        loading={isLoadingGetAttachmentList || isLoadingDeleteAttachmentList}
        handleReloadCard={handleReloadCard}
        handleDeleteAllSelected={onDeleteAttachmentList}
      />
      {getAttachmentListAttachments ? (
        <>
          <InfiniteScroll
            dataLength={getAttachmentListAttachments.length}
            next={() => setPage(page => page + 1)}
            hasMore={
              getAttachmentListLastPage
                ? page < getAttachmentListLastPage
                : false
            }
            loader={isLoadingGetAttachmentList ? <Loading /> : <></>}
            // height={400}
            style={{
              display: 'grid',
              overflowY: 'auto',
              listStyle: 'none',
              padding: 0,
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 10
            }}
          >
            <>
              {getAttachmentListAttachments.map(item => {
                const isItemSelected = isSelected(item.id)
                return (
                  <ImageListItem
                    key={item.id}
                    // sx={{ padding: 1, cursor: 'pointer', width: '14.28%' }}
                    onClick={event => {
                      // if (event.target !== event.currentTarget) return
                      console.log('setIdImageOpenModal')
                      setIdImageOpenModal(item.id)
                    }}
                  >
                    <img
                      src={`${item.source}?w=512&h=512&fit=crop&auto=format`}
                      srcSet={`${item.source}?w=512&h=512&fit=crop&auto=format&dpr=2 2x`}
                      // src={item.img}
                      // srcSet={item.img}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                      }}
                      title={item.title}
                      position="top"
                      actionIcon={
                        // <IconButton
                        //   sx={{ color: 'white' }}
                        //   aria-label={`star ${item.title}`}
                        // >
                        //   {isItemSelected ? <RemoveIcon /> : <CheckIcon />}
                        // </IconButton>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => {
                            console.log('handleToggleCheckbox')
                            handleToggleCheckbox(item.id)
                            event.stopPropagation()
                          }}
                        />
                      }
                      actionPosition="left"
                    />
                  </ImageListItem>
                )
              })}
            </>
          </InfiniteScroll>
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
