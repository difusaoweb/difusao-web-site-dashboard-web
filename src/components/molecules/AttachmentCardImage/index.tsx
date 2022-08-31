import * as React from 'react'
import { ImageListItem, ImageListItemBar, Checkbox } from '@mui/material'

import { AttachmentData } from '../../../redux'

interface AttachmentCardImageProps {
  attachment: AttachmentData
  selecteds: number[] | null
  setSelecteds(ids: number[] | null): void
  setAttachmentModalId(value: number): void
}
export const AttachmentCardImage = ({
  attachment,
  selecteds,
  setSelecteds,
  setAttachmentModalId
}: AttachmentCardImageProps) => {
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

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  const isItemSelected = isSelected(attachment.id)

  return (
    <ImageListItem
      onClick={e => {
        if (!selecteds) setAttachmentModalId(attachment.id)
      }}
    >
      <img
        src={`${attachment.source}?w=512&h=512&fit=crop&auto=format`}
        srcSet={`${attachment.source}?w=512&h=512&fit=crop&auto=format&dpr=2 2x`}
        // src={item.img}
        // srcSet={item.img}
        alt={attachment.title}
        loading="lazy"
      />
      <ImageListItemBar
        sx={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
        }}
        title={attachment.title}
        position="top"
        actionIcon={
          <Checkbox
            color="primary"
            checked={isItemSelected}
            onClick={e => {
              handleToggleCheckbox(attachment.id)
              e.stopPropagation()
            }}
          />
        }
        actionPosition="left"
      />
    </ImageListItem>
  )
}
