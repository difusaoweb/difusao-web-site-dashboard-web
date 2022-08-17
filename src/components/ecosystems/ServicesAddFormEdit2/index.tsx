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

import { CaseData, getCases, RootState } from '../../../redux'

interface ServicesAddFormEdit2Props {
  inStock: boolean
  setInStock(stock: boolean): void
  sku: string | null
  setSku(sku: string): void
  categoryId: number | null
  setCategoryId(categoryId: number): void
}
export const ServicesAddFormEdit2 = ({
  inStock,
  setInStock,
  sku,
  setSku,
  categoryId,
  setCategoryId
}: ServicesAddFormEdit2Props) => {
  const { casesList } = useSelector(
    (state: ReturnType<RootState>) => state.cases
  )
  const dispatch = useDispatch()

  const [loadingGetCases, setLoadingGetCases] = React.useState(false)

  // const [inStock, setInStock] = React.useState<boolean>(true)
  // const [sku, setSku] = React.useState<string | null>(null)
  // const [category, setCategory] = React.useState<number | null>(null)
  const [categoryList, setCategoryList] = React.useState<CaseData[] | null>(
    null
  )

  React.useEffect(() => {
    async function onGetCases() {
      if (loadingGetCases) {
        return
      }

      setLoadingGetCases(true)
      await dispatch(getCases())
      setLoadingGetCases(false)
    }
    onGetCases()
  }, [])

  React.useEffect(() => {
    if (casesList) {
      setCategoryList(casesList)
    }
  }, [casesList])

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
          label="SKU do servico"
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
