import * as React from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Checkbox
} from '@mui/material'
import { Check as CheckIcon, Remove as RemoveIcon } from '@mui/icons-material'

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
      {itemData.map(item => {
        const isItemSelected = isSelected(item.id)
        return (
          <ImageListItem
            key={item.id}
            sx={{ padding: 1, cursor: 'pointer', width: '14.28%' }}
            onClick={() => handleRowCellCheckbox(item.id)}
          >
            <img
              src={`${item.img}?w=512&h=512&fit=crop&auto=format`}
              srcSet={`${item.img}?w=512&h=512&fit=crop&auto=format&dpr=2 2x`}
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
    </ImageList>
  )
}

const itemData = [
  {
    id: 1,
    img: 'https://wcfmmp.wcfmdemos.com/wp-content/uploads/2022/05/logo.png',
    title: 'Breakfast'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey'
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball'
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern'
  },
  {
    id: 9,
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    id: 10,
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil'
  },
  {
    id: 11,
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star'
  },
  {
    id: 12,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    id: 13,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  },
  {
    id: 14,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    id: 15,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
  {
    id: 16,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey'
  },
  {
    id: 17,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball'
  },
  {
    id: 18,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern'
  },
  {
    id: 19,
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    id: 20,
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil'
  },
  {
    id: 21,
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star'
  },
  {
    id: 22,
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike'
  }
]
