import * as React from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Checkbox
} from '@mui/material'
import { Check as CheckIcon, Remove as RemoveIcon } from '@mui/icons-material'

import {
  useAppSelector,
  reduxAttachmentsGetAttachmentListFunction,
  useAppDispatch
} from '../../../redux'

interface LibaryModalListImagesProps {
  selecteds: number[] | null
  setSelecteds(selecteds: number[] | null): void
  multiple: boolean
}
export const LibaryModalListImages = ({
  selecteds,
  setSelecteds,
  multiple
}: LibaryModalListImagesProps) => {
  const { getAttachmentListAttachments } = useAppSelector(
    state => state.attachments
  )
  const dispatch = useAppDispatch()

  const [page, setPage] = React.useState(1)
  const [isLoadingGetAttachmentList, setIsLoadingGetAttachmentList] =
    React.useState(false)

  async function onGetAttachmentList() {
    setIsLoadingGetAttachmentList(true)
    await dispatch(reduxAttachmentsGetAttachmentListFunction({ page }))
    setIsLoadingGetAttachmentList(false)
  }

  React.useEffect(() => {
    if (isLoadingGetAttachmentList) return
    onGetAttachmentList()
  }, [])

  // const [selecteds, setSelecteds] = React.useState<number[] | null>(null)

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  function handleRowCellCheckbox(id: number) {
    if (multiple && selecteds) {
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

  return (
    <ImageList
      cols={7}
      sx={{
        m: 0,
        boxSizing: 'border-box',
        display: 'inline-flex',
        flexFlow: 'row wrap',
        gridTemplatecolumns: 'unset !important',
        gap: 'unset !important',
        flex: 1,
        height: 200
      }}
    >
      <>
        {getAttachmentListAttachments?.map(item => {
          const isItemSelected = isSelected(item.id)
          return (
            <ImageListItem
              key={item.id}
              sx={{ padding: 1, cursor: 'pointer', width: '14.28%' }}
              onClick={() => handleRowCellCheckbox(item.id)}
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
                    onClick={() => handleRowCellCheckbox(item.id)}
                  />
                }
                actionPosition="left"
              />
            </ImageListItem>
          )
        })}
      </>
    </ImageList>
  )
}
