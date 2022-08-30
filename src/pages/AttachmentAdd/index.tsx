import * as React from 'react'
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Paper
} from '@mui/material'

import { ProgressBar } from '../../components/atoms/ProgressBar'
import { Copyright } from '../../components/atoms/Copyright'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { AttachmentAddUploadArea } from '../../components/molecules/AttachmentAddUploadArea'
import { AttachmentAddUploadList } from '../../components/molecules/AttachmentAddUploadList'
import {
  UploadedFileType,
  reduxAttachmentsCreateAttachmentFunction,
  useAppDispatch
  // useAppSelector
} from '../../redux'
import styles from './index.module.scss'

export const AttachmentAddPage: React.FC = () => {
  // const { createAttachmentReturn } = useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const [isOnCreateAttachment, setIsOnCreateAttachment] = React.useState(false)
  const [isLoadingCreateAttachment, setIsLoadingCreateAttachment] =
    React.useState(false)

  const [uploadedFiles, setUploadedFiles] = React.useState<
    UploadedFileType[] | null
  >(null)

  function onCreateAttachment() {
    if (!uploadedFiles) return
    setIsOnCreateAttachment(false)

    uploadedFiles.forEach(uploadedFile => {
      if (!uploadedFile.uploaded) createAttachment(uploadedFile)
    })
  }

  async function createAttachment(file: UploadedFileType) {
    setIsLoadingCreateAttachment(true)
    await dispatch(
      reduxAttachmentsCreateAttachmentFunction({ file, setUploadedFiles })
    )
    setIsLoadingCreateAttachment(false)
  }

  React.useEffect(() => {
    if (!isOnCreateAttachment) return
    onCreateAttachment()
  }, [isOnCreateAttachment])

  console.log('uploadedFiles', uploadedFiles)

  return (
    <>
      <Box className={styles.containerGeneral}>
        <AppBar open={open} toggleDrawer={toggleDrawer} title="Adicionar" />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900]
          }}
          className={styles.main}
        >
          <Toolbar />
          <Container maxWidth="lg" className={styles.container}>
            <Box
              sx={{ display: 'flex', alignItens: 'center', marginBottom: 5 }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography component="h1" sx={{ fontWeight: 'bold' }}>
                  Enviar nova mídia
                </Typography>
                <Typography component="p">
                  Tipos de arquivo permitidos: jpg, jpeg, png.
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
                  <AttachmentAddUploadArea
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    setIsOnCreateAttachment={setIsOnCreateAttachment}
                  />
                  {uploadedFiles && (
                    <AttachmentAddUploadList uploadedFiles={uploadedFiles} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </Box>
      </Box>
    </>
  )
}
