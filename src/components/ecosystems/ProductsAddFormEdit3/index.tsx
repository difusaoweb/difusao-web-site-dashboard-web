import * as React from 'react'
import { Paper, Box, TextField } from '@mui/material'

interface ProductsAddFormEdit3Props {
  price: number | null
  setPrice(price: number): void
}
export const ProductsAddFormEdit3 = ({
  price,
  setPrice
}: ProductsAddFormEdit3Props) => {
  // const [price, setPrice] = React.useState<string | null>(null)

  return (
    <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Preço"
          variant="outlined"
          value={price}
          onChange={event => setPrice(Number(event.target.value))}
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          helperText={price ? '' : 'O preço é obrigatório.'}
          error={!price}
        />
      </Box>
    </Paper>
  )
}
