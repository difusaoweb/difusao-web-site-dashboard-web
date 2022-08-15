import React from 'react'
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

import { LibraryModalUploadArea } from '../../molecules/LibraryModalUploadArea'
import { LibaryModalListImages } from '../../molecules/LibaryModalListImages'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        display: value !== index ? 'none' : 'inline-flex',
        flex: 1
      }}
    >
      {value === index && children}
    </div>
  )
}

interface LibraryModalProps {
  open: boolean
  setOpen(open: boolean): void
  multiple: boolean
}
export const LibraryModal = ({
  open,
  setOpen,
  multiple
}: LibraryModalProps) => {
  const [tabModalActiveValue, setTabModalActiveValue] = React.useState(0)
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  function handleSelectImages() {
    if (!selecteds) {
      return null
    }
    console.log('handleSelectImages')
    console.log(selecteds)
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          position: 'fixed',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          zIndex: 160000,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardHeader
          title="Escolher imagem"
          action={
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            display: 'inline-flex',
            flex: 1,
            p: 0,
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Tabs
              value={tabModalActiveValue}
              onChange={(event, newValue: number) =>
                setTabModalActiveValue(newValue)
              }
              aria-label="basic tabs example"
            >
              <Tab label="Fazer upload de arquivos" {...a11yProps(0)} />
              <Tab label="Biblioteca de mídia" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabModalActiveValue} index={0}>
            <LibraryModalUploadArea />
          </TabPanel>
          <TabPanel value={tabModalActiveValue} index={1}>
            <LibaryModalListImages
              selecteds={selecteds}
              setSelecteds={setSelecteds}
              multiple={multiple}
            />
          </TabPanel>
        </CardContent>
        <CardActions
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            p: 2,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Button
            variant="contained"
            disabled={!selecteds}
            onClick={handleSelectImages}
          >
            Adicionar para galeria
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}
