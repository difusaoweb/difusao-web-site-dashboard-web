import * as React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import styles from './index.module.scss'
import { PageContainer } from '../../components/atoms/PageContainer'
import { AttachmentList } from '../../components/ecosystems/AttachmentList'

export const AttachmentListPage: React.FC = () => {
  return (
    <>
      <PageContainer title="Mídias">
        <>
          <Box className={styles.pageTopBar}>
            <Box className={styles.box}>
              <Typography component="h1" className={styles.titlePage}>
                Lista de mídias
              </Typography>
            </Box>
            <Box className={styles.box2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                href="/midias/adicionar"
              >
                Nova Mídia
              </Button>
            </Box>
          </Box>
          <AttachmentList />
        </>
      </PageContainer>
    </>
  )
}
