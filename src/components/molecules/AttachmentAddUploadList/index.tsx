import * as React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Alert,
  Divider
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'

import { ProgressBar } from '../../atoms/ProgressBar'
import { UploadedFileType } from '../../../redux/types'
import styles from './index.module.scss'

interface AttachmentAddUploadListProps {
  uploadedFiles: UploadedFileType[]
}
export const AttachmentAddUploadList = ({
  uploadedFiles
}: AttachmentAddUploadListProps) => {
  if (!uploadedFiles) return <></>

  return (
    <List
      className={styles.container}
      sx={{ backgroundColor: 'background.paper' }}
    >
      {uploadedFiles.map(file => (
        <>
          <ListItem key={file.id} className={styles.listItem}>
            <ListItemAvatar>
              <img src={file.preview} className={styles.listItemImagePreview} />
            </ListItemAvatar>
            <ListItemText
              primary={file.name}
              secondary={file.readableSize}
              className={styles.listItemInfo}
            />
            {!file.uploaded && !file.error && (
              <ProgressBar value={file.progress} />
            )}
            {file.error && (
              <Alert severity="error">Erro ao enviar está mídia!</Alert>
            )}
            {file.uploaded && (
              <Button variant="text" href={`/midias/${file.id}`}>
                Editar
              </Button>
            )}
          </ListItem>
        </>
      ))}
    </List>
  )
}
