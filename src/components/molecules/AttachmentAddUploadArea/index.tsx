import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import filesize from 'filesize'
import { uniqueId } from 'lodash'

import ModalLibraryUploadImageUrl from '../../../assets/images/ModalLibraryUploadImage.svg'
import Dropzone from 'react-dropzone'
import { UploadedFileType } from '../../../redux/types'
import styles from './index.module.scss'

interface AttachmentAddUploadAreaProps {
  uploadedFiles: UploadedFileType[] | null
  setUploadedFiles(files: UploadedFileType[] | null): void
  setIsOnCreateAttachment(is: boolean): void
}
export const AttachmentAddUploadArea = ({
  uploadedFiles,
  setUploadedFiles,
  setIsOnCreateAttachment
}: AttachmentAddUploadAreaProps) => {
  const theme = useTheme()

  function handleUpload(files: File[]) {
    const newUploadedFiles: UploadedFileType[] | null = files.map(
      (file, index) => ({
        file,
        id: index,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null
      })
    )

    setUploadedFiles(
      uploadedFiles ? uploadedFiles.concat(newUploadedFiles) : newUploadedFiles
    )
    setIsOnCreateAttachment(true)
  }

  return (
    <>
      <Dropzone
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg']
        }}
        onDropAccepted={handleUpload}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            style={{
              cursor: 'pointer',
              transition: 'height 0.2s ease',
              outline: 'currentcolor none medium',
              padding: '40px 8px',
              borderRadius: 8,
              border: `1px dashed ${
                isDragReject
                  ? theme.palette.error.dark
                  : theme.palette.background.default
              }`,
              backgroundColor: isDragReject
                ? theme.palette.error.main
                : '#ffffff1a',
              opacity: !isDragActive ? 1 : 0.72
            }}
            className={styles.mb16}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <Box sx={{ width: 200 }}>
                <img src={ModalLibraryUploadImageUrl} alt="Pasta de arquivos" />
              </Box>
              <Box sx={{ marginLeft: 2, p: 3 }}>
                <Typography variant="h5" component="h5">
                  Soltar ou Selecionar arquivo
                </Typography>
                <Typography variant="body2" component="p">
                  Solte os arquivos aqui ou clique e navegue pela sua máquina
                </Typography>
              </Box>
            </Box>
          </div>
        )}
      </Dropzone>
    </>
  )
}
