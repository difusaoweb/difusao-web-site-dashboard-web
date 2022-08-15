import * as React from 'react'
import {
  Paper,
  Box,
  TextField,
  Switch,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { TaxonomyData, getTaxonomies, RootState } from '../../../redux'

interface ProductsAddFormEdit2Props {
  inStock: boolean
  setInStock(stock: boolean): void
  sku: string | null
  setSku(sku: string): void
  categoryId: number | null
  setCategoryId(categoryId: number): void
}
export const ProductsAddFormEdit2 = ({
  inStock,
  setInStock,
  sku,
  setSku,
  categoryId,
  setCategoryId
}: ProductsAddFormEdit2Props) => {
  const { taxonomiesList } = useSelector(
    (state: ReturnType<RootState>) => state.taxonomies
  )
  const dispatch = useDispatch()

  const [loadingGetTaxonomies, setLoadingGetTaxonomies] = React.useState(false)

  // const [inStock, setInStock] = React.useState<boolean>(true)
  // const [sku, setSku] = React.useState<string | null>(null)
  // const [category, setCategory] = React.useState<number | null>(null)
  const [categoryList, setCategoryList] = React.useState<TaxonomyData[] | null>(
    null
  )

  React.useEffect(() => {
    async function onGetTaxonomies() {
      if (loadingGetTaxonomies) {
        return
      }

      setLoadingGetTaxonomies(true)
      await dispatch(getTaxonomies())
      setLoadingGetTaxonomies(false)
    }
    onGetTaxonomies()
  }, [])

  React.useEffect(() => {
    if (taxonomiesList) {
      setCategoryList(taxonomiesList)
    }
  }, [taxonomiesList])

  return (
    <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          control={
            <Switch
              checked={inStock}
              onChange={event => setInStock(Boolean(event.target.checked))}
            />
          }
          label="Em estoque"
          sx={{ mb: 3 }}
        />
        <TextField
          label="SKU do produto"
          variant="outlined"
          sx={{ mb: 3 }}
          value={sku}
          onChange={event => setSku(Number(event.target.value))}
        />
        <FormControl fullWidth>
          <InputLabel id="select-label-id-category">Categoria</InputLabel>
          <Select
            labelId="select-label-id-category"
            value={categoryId}
            label="Categoria"
            onChange={event => setCategoryId(Number(event.target.value))}
          >
            {categoryList?.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}
