import * as React from 'react'
import {
  Modal,
  Button,
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
  useAppSelector,
  useAppDispatch,
  reduxAttachmentsUpdateAttachmentFunction,
  reduxAttachmentsDeleteAttachmentListFunction,
  reduxAttachmentsClearStateFunction,
  AttachmentData
} from '../../../redux'

interface ModalImageProps {
  idImageOpenModal: number | null
  setIdImageOpenModal(id: number | null): void
  attachment: AttachmentData
}
export const ModalImage = ({
  idImageOpenModal,
  setIdImageOpenModal,
  attachment
}: ModalImageProps) => {
  const {
    deleteAttachmentListDeleted,
    deleteAttachmentListError,
    updateAttachmentUpdated,
    updateAttachmentError
  } = useAppSelector(state => state.attachments)
  const dispatch = useAppDispatch()

  const [title, setTitle] = React.useState<string | null>(attachment.title)
  const [isUpdateAttachment, setIsUpdateAttachment] = React.useState(false)
  const [isDeleteAttachment, setIsDeleteAttachment] = React.useState(false)

  const dateAttachment = DateTime.fromISO(attachment.created_at)
    .setLocale('pt-BR')
    .toFormat("dd 'de' MMMM 'de' yyyy")

  async function handleUpdateAttachment() {
    if (isUpdateAttachment || !title) return
    setIsUpdateAttachment(true)
    await dispatch(
      reduxAttachmentsUpdateAttachmentFunction({
        attachmentId: attachment.id,
        attachmentTitle: title
      })
    )
    setIsUpdateAttachment(false)
  }

  async function handleDeleteAttachment() {
    if (isDeleteAttachment) return
    setIsDeleteAttachment(true)
    await dispatch(
      reduxAttachmentsDeleteAttachmentListFunction({
        attachmentsId: [attachment.id]
      })
    )
    setIsDeleteAttachment(false)
  }

  React.useEffect(() => {
    if (!deleteAttachmentListDeleted) return
    dispatch(
      reduxAttachmentsClearStateFunction(
        'REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST'
      )
    )
    setIdImageOpenModal(null)
  }, [deleteAttachmentListDeleted])

  return (
    <Modal
      open={!!idImageOpenModal ?? false}
      onClose={() => setIdImageOpenModal(null)}
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
            <IconButton onClick={() => setIdImageOpenModal(null)}>
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
                  loading={isUpdateAttachment}
                  variant="contained"
                  disabled={
                    !!updateAttachmentUpdated || attachment.title === title
                  }
                  color="success"
                >
                  Salvar
                </LoadingButton>
                <LoadingButton
                  onClick={handleDeleteAttachment}
                  loading={isDeleteAttachment}
                  variant="contained"
                  disabled={!!deleteAttachmentListDeleted}
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
