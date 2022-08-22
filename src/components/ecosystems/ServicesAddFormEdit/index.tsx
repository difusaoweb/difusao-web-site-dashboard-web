import * as React from 'react'
import { Paper, TextField, Box, Typography } from '@mui/material'

interface ServicesAddFormEditProps {
  title: string | null
  setTitle(title: string | null): void
  description: string | null
  setDescription(description: string | null): void
}
export const ServicesAddFormEdit = ({
  title,
  setTitle,
  description,
  setDescription
}: ServicesAddFormEditProps) => {
  return (
    <Paper sx={{ width: '100%', mb: 2, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Nome do Serviço"
          variant="outlined"
          value={title ?? ''}
          onChange={e =>
            setTitle(e.target.value ? String(e.target.value) : null)
          }
          sx={{ mb: 3 }}
          // helperText={title ? '' : 'O nome é obrigatório.'}
          // error={!title}
        />
        <Box>
          <Typography sx={{ mb: 1 }}>Descrição</Typography>
          <TextField
            multiline
            value={description ?? ''}
            onChange={e =>
              setDescription(e.target.value ? String(e.target.value) : null)
            }
            rows={8}
            fullWidth
            sx={{ mb: 3 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
