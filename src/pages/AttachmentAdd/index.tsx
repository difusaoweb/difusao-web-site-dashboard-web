import * as React from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'

import { PageContainer } from '../../components/atoms/PageContainer'
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

  return (
    <>
      <PageContainer title="Adicionar">
        <>
          <Box className={styles.pageTopBar}>
            <Box className={styles.box}>
              <Typography component="h1" className={styles.titlePage}>
                Enviar nova mídia
              </Typography>
              <Typography component="p">
                Tipos de arquivo permitidos: jpg, jpeg, png.
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <AttachmentAddUploadArea
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  setIsOnCreateAttachment={setIsOnCreateAttachment}
                />
                {uploadedFiles && (
                  <>
                    <div className={styles.space} />
                    <AttachmentAddUploadList uploadedFiles={uploadedFiles} />
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      </PageContainer>
    </>
  )
}
