import * as React from 'react'
import { alpha } from '@mui/material/styles'
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Checkbox
} from '@mui/material'
import { Replay as ReplayIcon, Delete as DeleteIcon } from '@mui/icons-material'

import styles from './index.module.scss'
import { AttachmentData } from '../../../redux'

interface AttachmentTableTopbarProps {
  loading: boolean
  numSelected: number
  handleDeleteAllSelected(): void
  attachments: AttachmentData[] | null
  setSelecteds(ids: number[] | null): void
  setPage(page: number): void
  setIsOnGetAttachmentList(is: boolean): void
  resetTable(): void
}
export const AttachmentTableTopbar = ({
  loading,
  numSelected,
  handleDeleteAllSelected,
  attachments,
  setSelecteds,
  setPage,
  setIsOnGetAttachmentList,
  resetTable
}: AttachmentTableTopbarProps) => {
  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (!attachments) return
    if (event.target.checked) {
      setSelecteds(attachments.map(attachment => attachment.id))
    } else {
      setSelecteds(null)
    }
  }

  function handleReloadTable() {
    resetTable()
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
      className={styles.container}
    >
      {attachments ? (
        <>
          {numSelected > 0 ? (
            <>
              <Checkbox
                color="primary"
                indeterminate={
                  numSelected > 0 && numSelected < attachments.length
                }
                checked={
                  attachments.length > 0 && numSelected === attachments.length
                }
                onChange={handleSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts'
                }}
              />
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selecionados
              </Typography>
            </>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Mídias
            </Typography>
          )}
        </>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Mídias
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Deletar">
          <IconButton onClick={handleDeleteAllSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Recarregar lista">
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={handleReloadTable}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}
