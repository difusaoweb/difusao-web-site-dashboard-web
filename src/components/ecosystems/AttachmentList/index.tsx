import * as React from 'react'
import { ImageListItem, ImageListItemBar, Checkbox } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

import { ModalImage } from '../../molecules/ModalImage'
import {
  useAppSelector,
  reduxAttachmentsGetAttachmentListFunction,
  useAppDispatch
} from '../../../redux'
import { Loading } from '../../atoms/Loading'
import { FaceRetouchingNaturalSharp } from '@mui/icons-material'

export const AttachmentList = () => {
  const { getAttachmentListAttachments, getAttachmentListLastPage } =
    useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()

  const [page, setPage] = React.useState(1)
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [isLoadingGetAttachmentList, setIsLoadingGetAttachmentList] =
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

  async function onGetAttachmentList() {
    setIsLoadingGetAttachmentList(true)
    await dispatch(reduxAttachmentsGetAttachmentListFunction({ page }))
    setIsLoadingGetAttachmentList(false)
  }

  React.useEffect(() => {
    if (isLoadingGetAttachmentList) return
    onGetAttachmentList()
  }, [page])

  console.log('selecteds', selecteds)

  return (
    <>
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
              gridTemplateColumns: 'repeat(7, 1fr)',
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
                    // onClick={() => setIdImageOpenModal(item.id)}
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
                          onClick={() => handleToggleCheckbox(item.id)}
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
    </>
  )
}
