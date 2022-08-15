import * as React from 'react'
import {
  Paper,
  TextField,
  Box,
  Input,
  Button,
  Typography,
  Modal
} from '@mui/material'

import { UploadImagePreview } from '../../atoms/UploadImagePreview'
import { LibraryModal } from '../../organims/LibraryModal'
import ImagePlaceholderUploadFile from '../../../assets/images/ImageUploadPlaceholder.png'

interface ProductsAddFormEditProps {
  name: string | null
  setName(name: string): void
  description: string | null
  setDescription(description: string): void
}
export const ProductsAddFormEdit = ({
  name,
  setName,
  description,
  setDescription
}: ProductsAddFormEditProps) => {
  // const [name, setName] = React.useState<string | null>(null)
  // const [description, setDescription] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<string | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Paper sx={{ width: '100%', mb: 2, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Nome do Produto"
          variant="outlined"
          value={name}
          onChange={event => setName(String(event.target.value))}
          sx={{ mb: 3 }}
          helperText={name ? '' : 'O nome é obrigatório.'}
          error={!name}
        />
        <Box>
          <Typography sx={{ mb: 1 }}>Descrição</Typography>
          <TextField
            multiline
            value={description}
            onChange={event => setDescription(String(event.target.value))}
            rows={8}
            fullWidth
            sx={{ mb: 3 }}
          />
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }}>Imagem</Typography>
          <Box>
            <UploadImagePreview
              alt="Placeholder"
              url={ImagePlaceholderUploadFile}
              open={modalOpen}
              setOpen={setModalOpen}
            />
            <LibraryModal
              open={modalOpen}
              setOpen={() => setModalOpen(false)}
              multiple={false}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
