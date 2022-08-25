import * as React from 'react'
import { Paper, Box, Typography } from '@mui/material'

import { UploadImagePreview } from '../../atoms/UploadImagePreview'
import { LibraryModal } from '../LibraryModal'
import ImagePlaceholderUploadFile from '../../../assets/images/ImageUploadPlaceholder.png'

interface CasesAddFormEdit2Props {
  image: number | null
  setImage(image: number): void
}
export const CasesAddFormEdit2 = ({
  image,
  setImage
}: CasesAddFormEdit2Props) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
