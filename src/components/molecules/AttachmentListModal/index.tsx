import * as React from 'react'
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  TextField,
  Divider,
  ButtonGroup
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { DateTime } from 'luxon'

import {
  useAppDispatch,
  reduxAttachmentsUpdateAttachmentFunction,
  reduxAttachmentsDeleteAttachmentListFunction,
  AttachmentData
} from '../../../redux'

interface AttachmentListModalProps {
  setAttachmentModalId(value: React.SetStateAction<number | null>): void
  attachment: AttachmentData
  attachmentsHaveBeenDeleted: boolean
  setAttachmentsHaveBeenDeleted(value: React.SetStateAction<boolean>): void
}
export const AttachmentListModal = ({
  setAttachmentModalId,
  attachment,
  attachmentsHaveBeenDeleted,
  setAttachmentsHaveBeenDeleted
}: AttachmentListModalProps) => {
  const dispatch = useAppDispatch()

  const [title, setTitle] = React.useState<string | null>(attachment.title)
  const [loadingUpdateAttachment, setLoadingUpdateAttachment] =
    React.useState(false)
  const [loadingDeleteAttachmentList, setLoadingDeleteAttachmentList] =
    React.useState(false)

  const dateAttachment = DateTime.fromISO(attachment.createdAt)
    .setLocale('pt-BR')
    .toFormat("dd 'de' MMMM 'de' yyyy")

  async function handleUpdateAttachment() {
    if (loadingUpdateAttachment || !title) return

    setLoadingUpdateAttachment(true)
    await dispatch(
      reduxAttachmentsUpdateAttachmentFunction({
        attachmentId: attachment.id,
        attachmentTitle: title
      })
    )
    setLoadingUpdateAttachment(false)
  }

  async function handleDeleteAttachmentList() {
    if (loadingDeleteAttachmentList) return

    setLoadingDeleteAttachmentList(true)
    await dispatch(
      reduxAttachmentsDeleteAttachmentListFunction({
        attachmentsId: [attachment.id],
        setAttachmentsHaveBeenDeleted
      })
    )
    setLoadingDeleteAttachmentList(false)
  }

  React.useEffect(() => {
    if (!attachmentsHaveBeenDeleted) return
    setAttachmentModalId(null)
  }, [attachmentsHaveBeenDeleted])

  return (
    <Modal
      open={!!attachment ?? false}
      onClose={() => setAttachmentModalId(null)}
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
          title="Detalhes da Mídia"
          action={
            <IconButton onClick={() => setAttachmentModalId(null)}>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <div>
                <img
                  src={`${attachment.source}?w=512&h=512&fit=crop&auto=format`}
                  srcSet={`${attachment.source}?w=512&h=512&fit=crop&auto=format&dpr=2 2x`}
                  // src={item.img}
                  // srcSet={item.img}
                  alt={attachment.title}
                  loading="lazy"
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <p>
                <b>Upload feito em:</b> {dateAttachment}
              </p>
              <p>
                <b>Nome do arquivo:</b> {attachment.source.split('/').pop()}
              </p>
              {/* <p>
                <b>Tipo do arquivo:</b> image/png
              </p>
              <p>
                <b>Tamanho do arquivo:</b> 195 KB
              </p>
              <p>
                <b>Dimensões:</b> 300 por 168 píxeis
              </p> */}
              <Divider light variant="middle" />
              <br />
              <TextField
                label="Título da Imagem"
                variant="outlined"
                value={title ?? ''}
                onChange={e =>
                  setTitle(e.target.value ? String(e.target.value) : null)
                }
                sx={{ mb: 3 }}
                // helperText={title ? '' : 'O nome é obrigatório.'}
                // error={!title}
              />
              <Divider light variant="middle" />
              <br />
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <LoadingButton
                  onClick={handleUpdateAttachment}
                  loading={loadingUpdateAttachment}
                  variant="contained"
                  disabled={attachment.title === title}
                  color="success"
                >
                  Salvar
                </LoadingButton>
                <LoadingButton
                  onClick={handleDeleteAttachmentList}
                  loading={loadingDeleteAttachmentList}
                  variant="contained"
                  disabled={loadingDeleteAttachmentList}
                  color="error"
                >
                  Deletar
                </LoadingButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}
